const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis.helper");

exports.generateAccessJwtToken = async (payload) => {
	try {
		const { _id, email } = payload;
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
		await setJWT(accessToken, _id);
		return accessToken;
	} catch (error) {
		console.log(error);
	}
};

exports.generateRefreshJwtToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
};
