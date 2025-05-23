import { ObjectId } from "typeorm";

export interface IUser {
	id?: ObjectId;
	email?: string;
	password?: string;
	fullName?: string;
}
