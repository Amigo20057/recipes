import { ObjectId } from "mongodb";
import { myDataSource } from "../db/app-data-source";
import { Recipes } from "../entity/recipes.entity";
import { User } from "../entity/user.entity";

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

export const createUser = async (dto: User): Promise<User> => {
	const userToSave: User = {
		...dto,
		likedPosts: dto.likedPosts ?? [],
		followers: dto.followers ?? [],
		follows: dto.follows ?? [],
	};
	return await myDataSource.getMongoRepository(User).save(userToSave);
};

export const findUserByPostId = async (
	postId: string
): Promise<User | null> => {
	const objectId = new ObjectId(postId);

	const post = await myDataSource
		.getMongoRepository(Recipes)
		.findOne({ where: { _id: objectId } });

	if (!post) return null;

	const user = await myDataSource.getMongoRepository(User).findOne({
		where: { _id: new ObjectId(post.userId) },
	});

	return user;
};
