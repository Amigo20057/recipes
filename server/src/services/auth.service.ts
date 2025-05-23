import { hash, verify } from "argon2";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.entity";
import { createUser, findUserByEmail } from "./user.service";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (
	dto: User
): Promise<User & { token: string }> => {
	const existsUser = await findUserByEmail(dto.email!);
	if (existsUser) {
		throw new Error("User with email exists");
	}
	dto.password = await hash(dto.password!);
	const user = await createUser(dto);
	const token = jwt.sign(
		{
			id: user.id,
		},
		JWT_SECRET!,
		{
			expiresIn: "30d",
		}
	);
	return { ...user, token };
};

export const login = async (
	email: string,
	password: string
): Promise<User & { token: string }> => {
	const existsUser = await findUserByEmail(email);
	if (!existsUser) {
		throw new Error("Wrong data");
	}
	const validatePassword = await verify(existsUser.password, password);
	if (!validatePassword) {
		throw new Error("Wrong data");
	}
	const token = jwt.sign(
		{
			id: existsUser.id,
		},
		JWT_SECRET!,
		{
			expiresIn: "30d",
		}
	);
	return { ...existsUser, token };
};
