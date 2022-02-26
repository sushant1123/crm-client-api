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