const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

exports.isUserAuthorized = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const token = authorization.split(" ")[1];

		//verify if jwt is valid or not.
		const decoded = await verifyAccessJWT(token);

		//if email is present
		if (decoded.email) {
			//check if jwt exists in redis or not
			const userId = await getJWT(token);
			if (!userId) {
				return res.status(403).json({ status: "error", message: "Forbidden" });
			}

			req.user = { _id: userId };

			return next();
		}
		deleteJWT(token);

		return res.status(403).json({ status: "error", message: "Forbidden" });
	} catch (error) {
		next(error);
	}
};
