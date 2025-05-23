import { ObjectId } from "typeorm";
import { Recipes } from "../entity/recipes.entity";
import { User } from "../entity/user.entity";

export interface IRecipes {
	id: ObjectId;
	userId: ObjectId;
	title: string;
	description: string;
	tags?: string[];
	picture: string;
}

export type TRecipeWithAuthor = Recipes & User;
