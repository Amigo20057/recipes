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
		countLikes: +dto.countLikes,
		countComments: +dto.countComments,
		countShares: +dto.countShares,
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

export const getRecipes = async (): Promise<Recipes[] | null> => {
	return await myDataSource.getMongoRepository(Recipes).find();
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
