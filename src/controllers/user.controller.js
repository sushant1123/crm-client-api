const User = require("../models/user.model");

//helper fns
const { hashPassword, generateJwtToken } = require("../helpers/bcrypt.helper");

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
			const { _id } = user;
			const token = generateJwtToken(_id);
			return res
				.status(201)
				.json({ status: "success", message: "User Created Successfully", data: { token, user } });
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
					return res.status(200).json({ status: "success", data: user });
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
