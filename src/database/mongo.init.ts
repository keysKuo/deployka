import mongoose from 'mongoose';
import config from '../configs/dev.config';


class Database {
    private static instance: Database;

	constructor() {
		this.connect();
	}

	// connect method
	private connect(type = "mongodb") {
		if (1 === 1) {
			mongoose.set("debug", true);
			mongoose.set("debug", { color: true });
		}

		mongoose
			.connect(config.mongodbURL, { maxPoolSize: 100 })
			.then(() => {
				console.log(`⭐ Connected ${config.mongodbURL}`);
			})
			.catch((err) => console.log(`Error: ${err}`));
	}

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();
export default instanceMongodb;