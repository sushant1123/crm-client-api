const jwt = require("jsonwebtoken");

exports.generateAccessJwtToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

exports.generateRefreshJwtToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
};
