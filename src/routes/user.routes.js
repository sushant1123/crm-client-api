const express = require("express");
const { home } = require("nodemon/lib/utils");
const router = express.Router();

const { homeRoute, createUser } = require("../controllers/user.controller");

router.all("/user", homeRoute);

router.post("/user/create", createUser);

module.exports = router;
