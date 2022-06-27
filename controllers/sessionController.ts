import { Response, Request } from "express";
import { createSession } from "../services/sessionService";
import config from "config";
import { validatePassword } from "../services/userServices";
import { signJWT } from "../utils/jwt";

const jwtExpiry = config.get<string>("jwt_expiry");

export const createSessionHandler = async (req: Request, res: Response) => {
	const user = await validatePassword(req.body);
	if (!user) {
		return res.status(401).send("invalid user credentials");
	}

	const session = await createSession(user._id, req.get("user-agent") || "");

	const accessToken = signJWT(
		{ ...user, session: session._id },
		{ expiresIn: jwtExpiry }
	);
	const refreshToken = signJWT(
		{ ...user, session: session._id },
		{ expiresIn: jwtExpiry }
	);

	res.status(200).json({ accessToken, refreshToken });
};
