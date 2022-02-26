const express = require("express");
const router = express.Router();
const {
	createTicket,
	getAllTicketsByUserId,
	getTicketByTicketId,
} = require("../controllers/ticket.controller");
const { isUserAuthorized } = require("../middlewares/auth.middleware");

// router.all("/ticket", (req, res) => {
// 	res.status(200).json({ message: "from ticket routes" });
// });

router.post("/ticket", isUserAuthorized, createTicket);

router.get("/ticket", isUserAuthorized, getAllTicketsByUserId);

router.get("/ticket/:ticketId", isUserAuthorized, getTicketByTicketId);

// router.post("/ticket", isUserAuthorized, createTicket);

module.exports = router;
