const Joi = require("joi");

const email = Joi.string()
	.max(30)
	.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
	.required();

const phone = Joi.number().min(5000000000).max(9999999999).required();
const name = Joi.string().max(50).required();
const company = Joi.string().max(50).required();
const address = Joi.string().max(50).required();

const pin = Joi.string().min(6).max(6).required();
const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,20}$"));
const newPassword = Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,20}$"));

exports.createNewUserReqValidation = (req, res, next) => {
	const schema = Joi.object({ name, company, address, phone, email, password });
	const value = schema.validate(req.body);

	if (value.error) {
		return res.status(400).json({
			status: "error",
			message: value.error.message,
		});
	}

	next();
};

exports.resetPasswordReqValidation = (req, res, next) => {
	const schema = Joi.object({ email });
	const value = schema.validate(req.body);

	if (value.error) {
		return res.status(400).json({
			status: "error",
			message: value.error.message,
		});
	}
	next();
};

exports.updatePasswordReqValidation = (req, res, next) => {
	const schema = Joi.object({ email, pin, newPassword });
	const value = schema.validate(req.body);

	if (value.error) {
		return res.status(400).json({
			status: "error",
			message: value.error.message,
		});
	}
	next();
};
