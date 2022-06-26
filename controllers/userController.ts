import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../services/userServices";
import { CreateUserInputType } from "../schema/userSchema";

const createUserHandler = async (
	req: Request<{}, {}, CreateUserInputType["body"]>,
	res: Response
) => {
	const user = await createUser(req.body);
	res.status(200).json({ user: omit(user.toJSON(), "password") });
};

export { createUserHandler };
