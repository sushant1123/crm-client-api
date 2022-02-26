const Joi = require("joi");

const subject = Joi.string().min(2).max(100).required();
const sender = Joi.string().min(2).max(50).required();
const message = Joi.string().min(2).max(1000).required();
const status = Joi.string().min(2).max(30).required();

exports.createNewTicketValidation = (req, res, next) => {
	const schema = Joi.object({ subject, sender, message });

	const value = schema.validate(req.body);
	if (value.error) {
		console.log(value);
		return res.status(400).json({ status: "error", message: value.error.message });
	}
	next();
};

exports.updateTicketMessageValidation = (req, res, next) => {
	const schema = Joi.object({ sender, message });

	const value = schema.validate(req.body);
	if (value.error) {
		console.log(value);
		return res.status(400).json({ status: "error", message: value.error.message });
	}
	next();
};
