import { DocumentDefinition } from "mongoose";
import User, { UserInterface } from "../models/userModel";
import { omit } from "lodash";

export const createUser = async (
	input: DocumentDefinition<
		Omit<UserInterface, "updatedAt" | "createdAt" | "comparePassword">
	>
) => {
	try {
		return await User.create(input);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const validatePassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await User.findOne({ email });
	if (!user) {
		return false;
	}

	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		return false;
	}

	return omit(user.toJSON(), "password");
};
