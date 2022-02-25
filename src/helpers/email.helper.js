const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "jared.sporer30@ethereal.email",
		pass: "ZbeeWZQTh7VsqmyHF9",
	},
});

const send = async (mailInfo) => {
	return new Promise(async (resolve, reject) => {
		try {
			let info = await transporter.sendMail(mailInfo);

			console.log("Message sent: %s", info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

			// Preview only available when sending through an Ethereal account
			console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

			resolve(info);
		} catch (error) {
			console.log(error);
		}
	});
};

exports.emailProcessor = async (clientEmail, pin) => {
	let info = {
		from: '"CRM Ticket System" <jared.sporer30@ethereal.email>', // sender address
		to: clientEmail, // list of receivers
		subject: "Password Reset Pin - CRM Ticket System", // Subject line
		text: `Here is your password reset pin - ${pin}. This pin will expire in 1 day`, // plain text body
		html: `Here is your password reset pin - <b>${pin}</b>. This pin will expire in 1 day`, // html body
	};

	await send(info);
};
