const express = require("express");
const router = express.Router();

router.all("/ticket", (req, res) => {
	res.status(200).json({
		message: "from ticket routes",
	});
});

module.exports = router;
