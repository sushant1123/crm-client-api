const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", (err) => console.log("Redis Client Error", err));

exports.setJWT = async (key, value) => {
	try {
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
		await client.connect();
		const userId = await client.get(key);
		return userId;
	} catch (error) {
		console.log(error);
	} finally {
		await client.disconnect();
	}
};

exports.deleteJWT = async (key) => {
	try {
		await client.connect();
		await client.del(key);
	} catch (error) {
		console.log(error);
	} finally {
		await client.disconnect();
	}
};
