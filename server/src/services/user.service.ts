import { ObjectId } from "mongodb";
import { myDataSource } from "../db/app-data-source";
import { User } from "../entity/user.entity";
import { IUser } from "../types/user.interface";

export const getUsers = async (): Promise<User[]> => {
	return await myDataSource.getRepository(User).find();
};

export const findUserById = async (id: ObjectId): Promise<User | null> => {
	const objectId = new ObjectId(id);
	return await myDataSource
		.getMongoRepository(User)
		.findOne({ where: { _id: objectId } });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
	return await myDataSource.getRepository(User).findOne({ where: { email } });
};

export const createUser = async (dto: IUser): Promise<User> => {
	return await myDataSource.getMongoRepository(User).save(dto);
};
