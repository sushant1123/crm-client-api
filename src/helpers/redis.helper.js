const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", (err) => console.log("Redis Client Error", err));

exports.setJWT = async (key, value) => {
	return new Promise((resolve, reject) => {
		try {
			return client.set(key, value.toString(), (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		} catch (error) {
			reject(error);
		}
	});
};

exports.getJWT = async (key) => {
	return new Promise((resolve, reject) => {
		try {
			client.get(key, (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		} catch (error) {
			reject(error);
		}
	});
};

exports.deleteJWT = async (key) => {
	try {
		client.del(key);
	} catch (error) {
		console.log(error);
	}
};
