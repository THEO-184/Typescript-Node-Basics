import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateResource =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.query,
			});
			next();
		} catch (error: any) {
			return res.status(400).send(error.errors);
		}
	};

export default validateResource;
