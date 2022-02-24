const express = require("express");
const router = express.Router();

router.all("*", (req, res, next) => {
	const error = new Error("Resource not found...!");
	error.status = 404;

	next(error);
});

module.exports = router;
