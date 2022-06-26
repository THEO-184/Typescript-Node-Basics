import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
	body: object({
		name: string({
			required_error: "name is required",
		}),
		password: string({
			required_error: "password is required",
		}),
		confirmPassword: string({
			required_error: "password confirmation required",
		}),
		email: string({
			required_error: "email is required",
		}).email("Not a valid email"),
	}).refine((data) => data.confirmPassword === data.password, {
		message: "password do not match",
		path: ["confirmPassword"],
	}),
});

export type CreateUserInputType = Omit<
	TypeOf<typeof createUserSchema>,
	"body.confirmPassword"
>;
