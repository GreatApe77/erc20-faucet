import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectMongo() {
	if (mongoose.connection.readyState === 1) {
		console.log("MongoDB already connected");
		return mongoose.connection.asPromise();
	}

	try {
		const mongoUri = process.env.MONGODB_URI || "";

		await mongoose.connect(mongoUri);
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
		throw new Error("MongoDB connection error");
	}
}