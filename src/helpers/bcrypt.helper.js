const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.hashPassword = async (plainPassword) => {
	return await bcrypt.hash(plainPassword, saltRounds);
};
