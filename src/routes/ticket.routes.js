const express = require("express");
const router = express.Router();
const {
	createTicket,
	getAllTicketsByUserId,
	getTicketByTicketId,
	updateTicketMessageByTicketId,
	closeTicketById,
	deleteTicketById,
} = require("../controllers/ticket.controller");

const { isUserAuthorized } = require("../middlewares/auth.middleware");
const {
	createNewTicketValidation,
	updateTicketMessageValidation,
} = require("../middlewares/ticketFormValidation");

router.post("/ticket", isUserAuthorized, createNewTicketValidation, createTicket);

router.get("/ticket", isUserAuthorized, getAllTicketsByUserId);

router.get("/ticket/:ticketId", isUserAuthorized, getTicketByTicketId);

router.put(
	"/ticket/:ticketId",
	isUserAuthorized,
	updateTicketMessageValidation,
	updateTicketMessageByTicketId
);

router.patch("/ticket/close-ticket/:ticketId", isUserAuthorized, closeTicketById);

router.delete("/ticket/:ticketId", isUserAuthorized, deleteTicketById);

module.exports = router;
