const User = require("../models/user.model");

//helper fns
const {
	setPasswordResetPin,
	getPinByResetPinAndEmail,
	deletePinAfterReset,
} = require("./resetpin.controller");
const {
	generateAccessJwtToken,
	generateRefreshJwtToken,
	storeUserRefreshJWT,
} = require("../helpers/jwt.helper");
const { hashPassword } = require("../helpers/bcrypt.helper");
const { emailProcessor } = require("../helpers/email.helper");
const { deleteJWT } = require("../helpers/redis.helper");

exports.homeRoute = (req, res, next) => {
	// res.status(200).json({ message: "from user routes" });
	next();
};

exports.createUser = async (req, res) => {
	try {
		const { name, password, company, address, phone, email } = req.body;
		const obj = { name, company, address, phone, email };

		//password check
		if (password.length < 8) {
			let error = new Error("Password should be minimum of 8 characters long");
			error.status = 400;
			next(error);
		}

		//hash password if in constraints
		obj.hashed_password = await hashPassword(password);

		//create and save obj in db
		const userObj = new User(obj);
		const user = await userObj.save();

		if (user) {
			const { _id, name, company, address, phone, email } = user;
			// const accessToken = generateAccessJwtToken({ _id, name, company, address, phone, email });
			// const refreshToken = generateRefreshJwtToken({ _id, name, company, address, phone, email });

			return res.status(201).json({
				status: "success",
				message: "User Created Successfully",
				data: { user },
			});
		}
	} catch (error) {
		console.log(error);
		let status = error.status || 500;
		return res.status(status).json({ status: "error", message: error.message });
	}
};

exports.loginUser = (req, res, next) => {
	try {
		const { email, password } = req.body;

		//if no field or empty value return
		if (!email || !password) {
			return res.status(400).json({ status: "error", message: "Invalid form submission" });
		}

		//find the user with email provided
		User.findOne({ email: email }).exec(async (error, user) => {
			if (error) return res.status(400).json({ status: "error", message: "Invalid form submission" });

			if (user) {
				//compare the password sent in the req.
				const isPasswordCorrect = await user.authenticate(password);

				//if password is correct
				if (isPasswordCorrect) {
					const { _id, name, company, address, phone, email } = user;

					const accessToken = await generateAccessJwtToken({ _id, email });

					const refreshToken = await generateRefreshJwtToken({ _id, email });

					const updatedUser = await User.findOne({ email: email });

					return res.status(200).json({
						status: "success",
						message: "User loggedin successfully",
						data: { accessToken, refreshToken, user: updatedUser },
					});
				} else {
					let error = new Error("Email or password is incorrect");
					error.status = 400;
					next(error);
				}
			} else {
				let error = new Error("User not found");
				error.status = 400;
				next(error);
			}
		});

		//check the hashed password
	} catch (error) {
		console.log(error);
		let status = error.status || 500;

		return res.status(status).json({ status: "error", message: error.message });
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const user = await User.findById({ _id });
		res.status(200).json({ message: "from get user", user });
	} catch (error) {
		next(error);
	}
};

exports.resetPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email: email });
		if (!user || !user._id) {
			return res.status(400).json({
				status: "error",
				message: "If email exists, password reset pin will be emailed to you",
			});
		} else {
			const setPin = await setPasswordResetPin(email);
			await emailProcessor({ clientEmail: email, pin: setPin.pin, type: "request-new-password" });

			return res.status(200).json({
				status: "success",
				message: "If email exists, password reset pin will be emailed to you",
			});
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.patchResetPassword = async (req, res, next) => {
	try {
		const { email, pin, newPassword } = req.body;

		//get the pin sotored in the resetpin collection.
		const getPin = await getPinByResetPinAndEmail(email, pin);

		//if pin exists then check if it is expired or not.
		if (getPin && getPin._id) {
			const dbDate = getPin.addedAt;
			const expiresIn = 1;

			const expiryDate = dbDate.setDate(dbDate.getDate() + expiresIn);

			const today = new Date();

			//if pin not a valid pin, return response.
			if (today > expiryDate) {
				return res.status(400).json({ status: "error", message: "Invalid or expired Pin" });
			}

			//if pin is valid one,
			//encrypt the pwd and save it in mongodb.
			const hashed_password = await hashPassword(newPassword);

			//save it in db.
			const user = await User.findOneAndUpdate(
				{ email: email },
				{ $set: { hashed_password: hashed_password } },
				{ new: true }
			);

			//if we have got a user then return the response that the pwd got updated
			if (user && user._id) {
				//send email to user first that the pwd got updated
				await emailProcessor({ clientEmail: email, type: "password-update-success" });

				//but there is a problem.
				//if we update our pwd and leave pin in our db, user can reset it again with the same pwd.
				//so, we need to delete that pin from the db.
				const deletedData = await deletePinAfterReset(email, pin);
				console.log("deleted Data::", deletedData);
				if (deletedData._id) {
					console.log("old pin deleted...");
				}

				return res.status(201).json({
					status: "success",
					message: "Password has been updated successfully",
				});
			}
		}

		return res
			.status(400)
			.json({ status: "error", message: "Unable to reset your password. Please try again later" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.logoutUser = async (req, res) => {
	//get token from headers
	const { authorization } = req.headers;
	const token = authorization.split(" ")[1];

	//
	const { _id } = req.user;
	//delete access JWT token from redis db.
	await deleteJWT(token);

	//delete refresh token from user's collection.
	// pass empty string to update instead of deleting
	const result = await storeUserRefreshJWT(_id, "");

	if (result && result._id && result.refreshJWT.token === "") {
		return res.status(200).json({ status: "success", message: "Logged out successfuly" });
	}
	return res
		.status(500)
		.json({ status: "error", message: "Something went wrong...!. Please try again later." });
};
