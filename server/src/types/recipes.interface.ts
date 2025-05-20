import { ObjectId } from "typeorm";

export interface IRecipes {
	id: ObjectId;
	userId: ObjectId;
	title: string;
	description: string;
	tags?: string[];
	picture: string;
}
