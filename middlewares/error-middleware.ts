import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorMiddleware } from "../errors";

const errorMiddlewareHandler = async (
	err: ErrorMiddleware,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let customErr = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "something went wrong somewhere",
	};

	if (err.name === "ValidationError") {
		customErr.msg = Object.values(err.errors)
			.map((item: any) => {
				return item.message;
			})
			.join("");
	}
	res.status(StatusCodes.OK).send({ msg: customErr.msg });
};

export default errorMiddlewareHandler;
