import { connectMongo } from "./config/mongodb-connection";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
async function main() {
	await connectMongo();
	
	app.listen(PORT, () => {
		console.log(`Listening: ${PORT}`);
	});
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
