import CustomError from "./custom-error";

class ErrorMiddleware extends CustomError {
	statusCode: number;
	errors: any;
	code: any;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default ErrorMiddleware;
