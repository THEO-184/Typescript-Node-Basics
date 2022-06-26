import CustomError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

export default UnauthorizedError;
