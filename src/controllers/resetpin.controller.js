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
};

exports.getPinByResetPinAndEmail = (email, pin) => {
	return new Promise((resolve, reject) => {
		try {
			ResetPin.findOne({ email: email, pin: pin }).exec((error, data) => {
				if (error) {
					console.log(error);
					return reject(error);
				}
				return resolve(data);
			});
		} catch (error) {
			console.log(error);
			return reject(error);
		}
	});
};

exports.deletePinAfterReset = (email, pin) => {
	return new Promise((resolve, reject) => {
		try {
			ResetPin.findOneAndDelete({ email: email, pin: pin }).exec((error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		} catch (error) {
			console.log(error);
			return reject(error);
		}
	});
};
