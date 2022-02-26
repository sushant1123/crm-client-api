const Joi = require("joi");

const email = Joi.string()
	.max(30)
	.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
	.required();

const pin = Joi.string().min(6).max(6).required();
const newPassword = Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,20}$"));

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
