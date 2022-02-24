const mongoose = require("mongoose");

const connection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Database connected successfully...!");
	} catch (error) {
		console.log("mongoose error:", error);
	}
};

module.exports = connection;
