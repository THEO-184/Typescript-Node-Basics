import bcrypt from "bcryptjs";
import config from "config";
import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
	email: string;
	password: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserInterface>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// hash password

UserSchema.pre("save", async function (next) {
	try {
		let user = this as UserInterface;
		const salt = await bcrypt.genSalt(config.get<number>("saltSecret"));
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (error) {
		console.log(error);
	}
});

// compare password
UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	let user = this as UserInterface;
	const isMatched = await bcrypt.compare(password, user.password);
	return isMatched;
};

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
