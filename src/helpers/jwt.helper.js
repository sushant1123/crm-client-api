const jwt = require("jsonwebtoken");
const { setJWT } = require("./redis.helper");
const User = require("../models/user.model");

exports.generateAccessJwtToken = async (payload) => {
	try {
		const { _id, email } = payload;
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
		await setJWT(accessToken, _id);
		// return accessToken;
		return Promise.resolve(accessToken);
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

exports.generateRefreshJwtToken = async (payload) => {
	try {
		const { _id } = payload;
		const refreshJwtToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

		await storeUserRefreshJWT(_id, refreshJwtToken);

		// return refreshJwtToken;
		return Promise.resolve(refreshJwtToken);
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

storeUserRefreshJWT = async (_id, token) => {
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id },
			{ $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() } },
			{ new: true }
		);
		// return updatedUser;
		return Promise.resolve(updatedUser);
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

exports.verifyAccessJWT = (userJwt) => {
	try {
		const userData = jwt.verify(userJwt, process.env.JWT_ACCESS_SECRET);
		// return userData;
		return Promise.resolve(userData);
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

exports.verifyRefreshJWT = (userJwt) => {
	try {
		const userData = jwt.verify(userJwt, process.env.JWT_REFRESH_SECRET);
		// return userData;
		return Promise.resolve(userData);
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

exports.storeUserRefreshJWT = storeUserRefreshJWT;
