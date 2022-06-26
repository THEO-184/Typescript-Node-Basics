import "express-async-errors";
import express, { Request, Response } from "express";
import config from "config";
import { json, urlencoded } from "body-parser";
import connectDB from "../db/connect";
import log from "../utils/logger";
import userRoutes from "../routes/userRoutes";

// middlewares
import errorMiddlewareHandler from "../middlewares/error-middleware";
const port = config.get<number>("port");
const dbUrl = config.get<string>("dbUri");

const app = express();

// app.use(json());
// app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
	res.send("home");
});

app.use("/api/v1/users", userRoutes);
app.use(errorMiddlewareHandler);

// routes

const start = async () => {
	try {
		await connectDB(dbUrl);
		app.listen(port, () => {
			log.info(`server running on port ${port}`);
			console.log();
		});
	} catch (error) {
		console.log("error on connecting to server");
		process.exit(1);
	}
};

start();
