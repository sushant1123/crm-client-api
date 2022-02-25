const express = require("express");
const router = express.Router();

const userRouters = require("./user.routes");
const ticketRoutes = require("./ticket.routes");
const tokenRoutes = require("./token.routes");

router.use("/v1", userRouters);
router.use("/v1", ticketRoutes);
router.use("/v1", tokenRoutes);

module.exports = router;
