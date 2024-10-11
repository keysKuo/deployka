import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import helmet from "helmet";
import { ErrorResponse } from '../middlewares/error.res';
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	expressSession({
		secret: "nkeyskuo TS",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

import "../database/mongo.init";
import routes from '../routes';

app.use('/api/v1', routes);

// init routers
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json({
		msg: "Server Initialization",
	});
});

// Handling error

app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new ErrorResponse("❌ Not Found", 404);
	next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.code || 500;
	return res.status(statusCode).json({
		success: false,
		code: statusCode,
		stack: err.stack,
		message: err.message || "❌ Internal Server Error",
	});
});

export default app;