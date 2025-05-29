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

export const toggleSubscribe = async (
	targetUserId: string,
	userId: string | ObjectId
) => {
	const targetUserIdObject = new ObjectId(targetUserId);
	const userIdObject = new ObjectId(userId);

	const repo = myDataSource.getMongoRepository(User);

	const userTarget = await repo.findOne({
		where: { _id: targetUserIdObject },
	});
	const user = await repo.findOne({ where: { _id: userIdObject } });

	if (!user || !userTarget) {
		throw new Error("User or target user not found");
	}

	const userIdStr = userIdObject.toHexString();
	const targetIdStr = targetUserIdObject.toHexString();

	const isFollowing = user.follows.includes(targetIdStr);

	if (isFollowing) {
		user.follows = user.follows.filter(id => id !== targetIdStr);
		userTarget.followers = userTarget.followers.filter(
			id => id !== userIdStr
		);
	} else {
		user.follows.push(targetIdStr);
		userTarget.followers.push(userIdStr);
	}

	await repo.save(user);
	await repo.save(userTarget);
};
