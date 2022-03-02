const Ticket = require("../models/ticket.model");
const {
	createTicketModelFn,
	getAllTicketsByUserIdModelFn,
	getTicketByTicketIdModelFn,
	updateTicketMessageModelFn,
	updateTicketStatusToCloseModelFn,
	deleteTicketByIdModelFn,
} = require("./modelFunctions/ticket.modelfns");

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

//get all tickets by user's id
exports.getAllTicketsByUserId = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const result = await getAllTicketsByUserIdModelFn(_id);
		// console.log(result);

		return res.status(200).json({ status: "success", result });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.getTicketByTicketId = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { ticketId } = req.params;

		const result = await getTicketByTicketIdModelFn(_id, ticketId);
		// console.log(result);

		if (result && result._id) {
			return res.status(200).json({ status: "success", result });
		} else {
			return res.status(200).json({ status: "success", message: "No ticket with the given id" });
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};

//Update ticket details ie. reply message
exports.updateTicketMessageByTicketId = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { ticketId } = req.params;
		const { sender, message } = req.body;

		if (!sender || !message) {
			return res.status(400).json({ status: "error", message: "some fields are required" });
		}

		//check if user has created that ticket or not.
		const getTicketResult = await getTicketByTicketIdModelFn(_id, ticketId);
		//if not then return the response saying forbidden
		if (!getTicketResult || !getTicketResult._id) {
			return res
				.status(403)
				.json({ status: "error", message: "You are not authorized to update this ticket" });
		}

		const result = await updateTicketMessageModelFn(ticketId, sender, message);
		// console.log(result);

		if (result && result._id) {
			return res.status(200).json({ status: "success", message: "Ticket updated successfully" });
		} else {
			return res.status(200).json({ status: "success", message: "No ticket with the given id" });
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.closeTicketById = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { ticketId } = req.params;

		const result = await updateTicketStatusToCloseModelFn(_id, ticketId);
		if (result && result._id) {
			return res.status(200).json({ status: "success", message: "The ticket has been closed." });
		}
		return res.status(400).json({ status: "error", message: "Unable to close your ticket." });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

//delete the ticket by ticket id
exports.deleteTicketById = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { ticketId } = req.params;

		const result = await deleteTicketByIdModelFn(_id, ticketId);
		console.log(result);

		if (result && result._id) {
			return res.status(200).json({ status: "success", message: "The ticket has been deleted." });
		} else {
			return res.status(403).json({ status: "error", message: "Unable to delete this ticket." });
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};
