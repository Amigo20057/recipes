import { ObjectId } from "mongodb";
// import { MongoRepository } from "typeorm";
import { myDataSource } from "../db/app-data-source";
import { Recipes } from "../entity/recipes.entity";
import { User } from "../entity/user.entity";
import { TRecipeWithAuthor } from "../types/recipes.interface";

export const createRecipe = async (
	dto: Recipes,
	id: ObjectId | string,
	pictureUrl: string
): Promise<Recipes> => {
	return await myDataSource.getRepository(Recipes).save({
		title: dto.title,
		description: dto.description,
		userId: id,
		picture: pictureUrl,
		tags: dto.tags,
		categories: dto.categories,
		cookingTime: dto.cookingTime,
		createdAt: new Date(),
		countLikes: 0,
		countComments: 0,
		countShares: 0,
	});
};

export const getRecipe = async (
	postId: string | ObjectId
): Promise<TRecipeWithAuthor | null> => {
	const objectRecipeId = new ObjectId(postId);

	const recipeRepo = myDataSource.getMongoRepository(Recipes);
	const userRepo = myDataSource.getMongoRepository(User);
	const recipe = await recipeRepo.findOne({ where: { _id: objectRecipeId } });

	const objectUserId = new ObjectId(recipe?.userId);

	const user = await userRepo.findOne({ where: { _id: objectUserId } });

	return {
		...(recipe as Recipes),
		...(user as User),
	};
};

export const getUserRecipes = async (
	userId: ObjectId
): Promise<Recipes[] | null> => {
	const objectId = new ObjectId(userId);
	return await myDataSource
		.getMongoRepository(Recipes)
		.find({ where: { userId: objectId } });
};

export const getFollowRecipes = async (
	userId: ObjectId
): Promise<Recipes[] | null> => {
	const objectId = new ObjectId(userId);

	const userRepo = myDataSource.getMongoRepository(User);
	const recipeRepo = myDataSource.getMongoRepository(Recipes);

	const user = await userRepo.findOne({ where: { _id: objectId } });

	if (!user || !user.follows?.length) {
		return [];
	}

	const followsObjectIds = user.follows.map(id => new ObjectId(id));

	const recipes = await recipeRepo.find({
		where: {
			userId: { $in: followsObjectIds },
		},
		order: {
			createdAt: "DESC",
		},
	});

	return recipes;
};

export const getRecipes = async (
	category?: string
): Promise<Recipes[] | null> => {
	if (category) {
		return await myDataSource.getMongoRepository(Recipes).find({
			where: {
				categories: category,
			},
			order: {
				createdAt: "DESC",
			},
		});
	} else {
		return await myDataSource.getMongoRepository(Recipes).find({
			order: {
				createdAt: "DESC",
			},
		});
	}
};

export const likeRecipe = async (
	userId: ObjectId,
	postId: ObjectId | string
): Promise<void> => {
	const objectUserId = new ObjectId(userId);
	const objectRecipeId = new ObjectId(postId);

	const recipeRepo = myDataSource.getMongoRepository(Recipes);
	const userRepo = myDataSource.getMongoRepository(User);

	const recipe = await recipeRepo.findOne({ where: { _id: objectRecipeId } });
	const user = await userRepo.findOne({ where: { _id: objectUserId } });

	if (!recipe || !user) throw new Error("Recipe or user not found");

	const recipeIdStr = recipe.id.toString();
	const hasLiked = user.likedPosts.includes(recipeIdStr);

	if (hasLiked) {
		recipe.countLikes = Math.max(0, recipe.countLikes - 1);
		user.likedPosts = user.likedPosts.filter(id => id !== recipeIdStr);
	} else {
		recipe.countLikes += 1;
		user.likedPosts.push(recipeIdStr);
	}

	await recipeRepo.save(recipe);
	await userRepo.save(user);
};
