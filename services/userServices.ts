import { DocumentDefinition } from "mongoose";
import User, { UserInterface } from "../models/userModel";

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
