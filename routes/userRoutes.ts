import express, { Express, Request, Response, Router } from "express";
import { createUserHandler } from "../controllers/userController";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schema/userSchema";
const router = express.Router();

router.get("/healtchecks", (req: Request, res: Response) => {
	res.status(200).send("heclth checks");
});

router.route("/").post(validateResource(createUserSchema), createUserHandler);

export default router;
