const Ticket = require("../models/ticket.model");
const { createTicketModelFn, getAllTicketsByUserIdModelFn } = require("./modelFunctions/ticket.modelfns");

exports.createTicket = async (req, res, next) => {
	try {
		const { sender, message, subject } = req.body;
		const { _id } = req.user;

		const ticketObj = {
			clientId: _id,
			subject: subject,
			conversations: [
				{
					sender: sender,
					message: message,
				},
			],
		};

		const result = await createTicketModelFn(ticketObj);
		if (result && result._id) {
			return res.status(201).json({
				status: "success",
				message: "A new ticket has been created",
				result,
			});
		}
		return res.status(400).json({ status: "error", message: "Unable to create a ticket" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.getAllTicketsByUserId = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const result = await getAllTicketsByUserIdModelFn(_id);
		// console.log(result);

		if (result && result.length) {
			return res.status(200).json({ status: "success", result });
		} else {
			return res
				.status(200)
				.json({ status: "success", message: "No tickets to show! Please create one to see" });
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};
