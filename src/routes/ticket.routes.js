const express = require("express");
const { createTicket } = require("../controllers/ticket.controller");
const router = express.Router();

// router.all("/ticket", (req, res) => {
// 	res.status(200).json({ message: "from ticket routes" });
// });

router.post("/ticket", createTicket);

module.exports = router;
