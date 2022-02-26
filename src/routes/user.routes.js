const express = require("express");
const { home } = require("nodemon/lib/utils");
const router = express.Router();
const { isUserAuthorized } = require("../middlewares/auth.middleware");
const {
	resetPasswordReqValidation,
	updatePasswordReqValidation,
} = require("../middlewares/formValidation.middleware");

const {
	homeRoute,
	createUser,
	loginUser,
	getUser,
	resetPassword,
	patchResetPassword,
} = require("../controllers/user.controller");

router.all("/user", homeRoute);

router.get("/user", isUserAuthorized, getUser);

router.post("/user/create", createUser);

router.post("/user/login", loginUser);

router.post("/user/reset-password", resetPasswordReqValidation, resetPassword);

router.patch("/user/reset-password", updatePasswordReqValidation, patchResetPassword);

module.exports = router;
