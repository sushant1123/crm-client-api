const express = require("express");
const router = express.Router();

const userRouters = require("./user.routes");
const ticketRoutes = require("./ticket.routes");

router.use("/v1", userRouters);
router.use("/v1", ticketRoutes);

module.exports = router;
