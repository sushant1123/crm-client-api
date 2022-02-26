const Ticket = require("../models/ticket.model");
const { createTicketFn } = require("./modelFunctions/ticket.modelfns");

exports.createTicket = async (req, res, next) => {
	try {
		const { sender, message, subject } = req.body;
		const ticketObj = {
			clientId: "6218d4e97906c2e2c2a69d62",
			subject: subject,
			conversations: [
				{
					sender: sender,
					message: message,
				},
			],
		};

		const result = await createTicketFn(ticketObj);
		if (result && result._id) {
			return res
				.status(201)
				.json({ status: "success", message: "A new ticket has been created", result });
		}
		return res.status(400).json({ status: "error", message: "Unable to create a ticket" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
