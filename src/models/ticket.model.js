const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
	{
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		subject: {
			type: String,
			maxlength: 100,
			required: true,
			default: "",
		},

		openedAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},

		status: {
			type: String,
			maxlength: 30,
			required: true,
			default: "Pending operators response",
		},

		conversations: [
			{
				sender: {
					type: String,
					maxlength: 50,
					required: true,
					default: "",
				},
				message: {
					type: String,
					maxlength: 1000,
					required: true,
					default: "",
				},
				messagedAt: {
					type: Date,
					required: true,
					default: Date.now(),
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
