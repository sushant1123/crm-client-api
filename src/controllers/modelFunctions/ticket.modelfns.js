const Ticket = require("../../models/ticket.model");

exports.createTicketFn = (ticketObj) => {
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
