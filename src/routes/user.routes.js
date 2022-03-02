const express = require("express");
const { home } = require("nodemon/lib/utils");
const router = express.Router();
const { isUserAuthorized } = require("../middlewares/auth.middleware");
const {
	resetPasswordReqValidation,
	updatePasswordReqValidation,
	createNewUserReqValidation,
} = require("../middlewares/formValidation.middleware");

const {
	homeRoute,
	createUser,
	loginUser,
	getUser,
	resetPassword,
	patchResetPassword,
	logoutUser,
} = require("../controllers/user.controller");

router.all("/user", homeRoute);

router.get("/user", isUserAuthorized, getUser);

router.post("/user/create", createNewUserReqValidation, createUser);

router.post("/user/login", loginUser);

router.post("/user/reset-password", resetPasswordReqValidation, resetPassword);

router.patch("/user/reset-password", updatePasswordReqValidation, patchResetPassword);

//user logout and invalidate jwt's.
router.delete("/user/logout", isUserAuthorized, logoutUser);

module.exports = router;
