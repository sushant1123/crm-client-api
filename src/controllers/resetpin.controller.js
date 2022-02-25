const ResetPin = require("../models/resetpin.model");
const { generateRandomPin } = require("../utils/randomPinGenerator");

exports.setPasswordResetPin = (email) => {
	const randomPin = generateRandomPin();
	const resetPinPayload = {
		email,
		pin: randomPin,
	};

	return new Promise((resolve, reject) => {
		ResetPin(resetPinPayload)
			.save()
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});

	pinObj.save();
};
