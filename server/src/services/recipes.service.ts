import { ObjectId } from "mongodb";
// import { MongoRepository } from "typeorm";
import { myDataSource } from "../db/app-data-source";
import { Recipes } from "../entity/recipes.entity";

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
		countLikes: dto.countLikes,
		countComments: dto.countComments,
		countShares: dto.countShares,
	});
};

export const getRecipe = async (
	id: string | ObjectId
): Promise<Recipes | null> => {
	const objectId = new ObjectId(id);
	return await myDataSource
		.getRepository(Recipes)
		.findOneBy({ id: objectId });
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

// export const updateRecipe = async (
// 	id: ObjectId,
// 	title?: string,
// 	description?: string,
// 	tags?: string[]
// ): Promise<Recipes> => {
// 	const objectId = new ObjectId(id);
// 	const recipe = await getRecipe(objectId);
// 	if (!recipe) {
// 		throw new Error("Recipe not found");
// 	}
// 	const updateRecipe = {
// 		...(title && { title }),
// 		...(description && { description }),
// 		...(tags && { tags }),
// 	};
// 	await myDataSource
// 		.getRepository(Recipes)
// 		.update({ id: objectId }, updateRecipe);
// 	return (await getRecipe(objectId))!;
// };

// export const deleteRecipe = async (id: ObjectId | string): Promise<void> => {
// 	const objectId = new ObjectId(id);
// 	await myDataSource.getRepository(Recipes).delete(objectId);
// };

// export const filterRecipe = async (
// 	title?: string,
// 	tags?: string[]
// ): Promise<Recipes[] | null> => {
// 	const recipeRepo: MongoRepository<Recipes> =
// 		myDataSource.getMongoRepository(Recipes);

// 	let filter: any = {};

// 	if (title) filter.title = { $regex: title, $options: "i" };
// 	if (tags && tags.length > 0) filter.tags = { $in: tags };

// 	return await recipeRepo.find({ where: filter });
// };
