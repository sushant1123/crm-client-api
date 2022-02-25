const express = require("express");
const router = express.Router();
const { getRefreshToken } = require("../controllers/token.controller");

//get the refresh token
router.get("/tokens", getRefreshToken);

module.exports = router;
