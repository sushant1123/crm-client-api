const User = require("../../models/user.model");

exports.verifyUserModelFn = (_id, clientEmail) => {
	return new Promise((resolve, reject) => {
		try {
			User.findOneAndUpdate(
				{ _id: _id, email: clientEmail, isVerified: false },
				{ $set: { isVerified: true } },
				{ new: true }
			)
				.then((data) => resolve(data))
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
