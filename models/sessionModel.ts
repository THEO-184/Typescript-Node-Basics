import { string } from "zod";
import { model, Schema, Types, Document } from "mongoose";
import { UserInterface } from "./userModel";

interface SessionInterface extends Document {
	user: UserInterface["_id"];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const SessionSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "User",
	},
	valid: {
		type: Boolean,
		default: true,
	},
	userAgent: {
		type: String,
	},
});

const Session = model<SessionInterface>("Session", SessionSchema);
export default Session;
