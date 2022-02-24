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
			throw error;
		}

		//hash password if in constraints
		obj.hashed_password = await hashPassword(password);

		//create and save obj in db
		const userObj = new User(obj);
		const user = await userObj.save();

		if (user) {
			const { _id } = user;
			const token = await generateJwtToken(_id);
			return res.status(201).json({ message: "User Created Successfully", data: { token, user } });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ status: "error", message: error.message });
	}
};
