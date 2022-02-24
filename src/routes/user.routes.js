const express = require("express");
const { home } = require("nodemon/lib/utils");
const router = express.Router();

const { homeRoute, createUser, loginUser } = require("../controllers/user.controller");

router.all("/user", homeRoute);

router.post("/user/create", createUser);

router.post("/user/login", loginUser);

module.exports = router;
