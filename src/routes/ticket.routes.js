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

router.post("/ticket", isUserAuthorized, createTicket);

router.get("/ticket", isUserAuthorized, getAllTicketsByUserId);

router.get("/ticket/:ticketId", isUserAuthorized, getTicketByTicketId);

router.put("/ticket/:ticketId", isUserAuthorized, updateTicketMessageByTicketId);

router.patch("/ticket/close-ticket/:ticketId", isUserAuthorized, closeTicketById);

router.delete("/ticket/:ticketId", isUserAuthorized, deleteTicketById);

module.exports = router;
