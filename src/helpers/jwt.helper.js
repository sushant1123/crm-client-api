const jwt = require("jsonwebtoken");
const { setJWT } = require("./redis.helper");
const User = require("../models/user.model");

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

exports.generateRefreshJwtToken = async (payload) => {
	try {
		const { _id } = payload;
		const refreshJwtToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

		await storeUserRefreshJWT(_id, refreshJwtToken);

		return refreshJwtToken;
	} catch (error) {
		console.log(error);
	}
};

const storeUserRefreshJWT = async (_id, token) => {
	try {
		await User.findOneAndUpdate(
			{ _id },
			{ $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() } },
			{ new: true }
		);
	} catch (error) {
		console.log(error);
	}
};
