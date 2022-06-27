import config from "config";
import Jwt from "jsonwebtoken";

const privateKey = config.get<string>("privateKey");

export function signJWT(payload: Object, options: Jwt.SignOptions | undefined) {
	return Jwt.sign(payload, privateKey, {
		...(options && options),
	});
}

export function verifyJWT(token: string) {
	try {
		const decoded = Jwt.verify(token, privateKey);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (error: any) {
		return {
			valid: true,
			expired: error.message === "jwt expired",
			decoded: null,
		};
	}
}
