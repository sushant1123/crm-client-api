const Ticket = require("../../models/ticket.model");

exports.createTicketModelFn = (ticketObj) => {
	return new Promise((resolve, reject) => {
		try {
			const ticket = new Ticket(ticketObj);
			ticket
				.save()
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

exports.getAllTicketsByUserIdModelFn = (userId) => {
	return new Promise((resolve, reject) => {
		try {
			Ticket.find({ clientId: userId })
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

exports.getTicketByTicketIdModelFn = (userId, ticketId) => {
	return new Promise((resolve, reject) => {
		try {
			Ticket.findOne({ clientId: userId, _id: ticketId })
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

exports.updateTicketMessageModelFn = (ticketId, sender, message) => {
	return new Promise((resolve, reject) => {
		try {
			Ticket.findOneAndUpdate(
				{ _id: ticketId },
				{
					status: "Pending operators response",
					$push: {
						conversations: { sender: sender, message: message },
					},
				},
				{ new: true }
			)
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

exports.updateTicketStatusToCloseModelFn = (clientId, ticketId) => {
	return new Promise((resolve, reject) => {
		try {
			Ticket.findOneAndUpdate(
				{ _id: ticketId, clientId: clientId },
				{ $set: { status: "Closed" } },
				{ new: true }
			)
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

exports.deleteTicketByIdModelFn = (clientId, ticketId) => {
	return new Promise((resolve, reject) => {
		try {
			Ticket.findOneAndDelete({ _id: ticketId, clientId: clientId })
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
