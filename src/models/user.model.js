const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: 50,
			required: true,
		},
		company: {
			type: String,
			maxlength: 50,
			required: true,
		},
		address: {
			type: String,
			maxlength: 100,
		},
		phone: {
			type: Number,
			maxlength: 11,
		},
		email: {
			type: String,
			maxlength: 50,
			required: true,
			unique: true,
		},
		hashed_password: {
			type: String,
			minlength: 8,
			maxlength: 100,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.methods = {
	authenticate: async function (password) {
		return await bcrypt.compare(password, this.hashed_password);
	},
};

module.exports = mongoose.model("User", UserSchema);
