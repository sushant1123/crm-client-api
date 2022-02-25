const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

exports.setJWT = async (key, value) => {
	try {
		client.on("error", (err) => console.log("Redis Client Error", err));
		await client.connect();
		await client.set(key, value);
	} catch (error) {
		console.log(error);
	} finally {
		await client.disconnect();
	}
};

exports.getJWT = async (key) => {
	try {
		client.on("error", (err) => console.log("Redis Client Error", err));
		await client.connect();
		const userId = await client.get(key);
		return userId;
	} catch (error) {
		console.log(error);
	} finally {
		await client.disconnect();
	}
};
