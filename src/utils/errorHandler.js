const errorHandler = (err, req, res, next) => {
	console.log(err);
	const status = err.status || 500;
	res.status(status).json({
		message: err.message,
	});
};

module.exports = errorHandler;
