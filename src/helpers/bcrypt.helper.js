const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.hashPassword = async (plainPassword) => {
	return await bcrypt.hash(plainPassword, saltRounds);
};

exports.generateJwtToken = (_id) => {
	return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
