const { verifyRefreshJWT, verifyAccessJWT, generateAccessJwtToken } = require("../helpers/jwt.helper");
const User = require("../models/user.model");

exports.getRefreshToken = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const token = authorization.split(" ")[1];
		const decoded = await verifyRefreshJWT(token);
		// console.log(decoded);

		if (decoded.email) {
			const userProfile = await User.findOne({ email: decoded.email });
			if (userProfile._id) {
				let tokenExpiry = userProfile.refreshJWT.addedAt;
				const dbRefreshToken = userProfile.refreshJWT.token;
				tokenExpiry = tokenExpiry.setDate(
					tokenExpiry.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DATE
				);
				const today = new Date();
				if (dbRefreshToken !== token && tokenExpiry < today) {
					return res.status(403).json({ message: "forbidden" });
				}
				let jwtPayload = {
					_id: userProfile._id,
					email: userProfile.email,
				};
				const accessToken = await generateAccessJwtToken(jwtPayload);
				return res.status(200).json({ status: "success", accessToken });
			}
		}
		return res.status(403).json({ status: "error", message: "forbidden" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
