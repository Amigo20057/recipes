import "dotenv/config";
import { DataSource } from "typeorm";
import { Comments } from "../entity/comments.entity";
import { Recipes } from "../entity/recipes.entity";
import { User } from "../entity/user.entity";

export const myDataSource = new DataSource({
	type: "mongodb",
	url: process.env.DATABASE_CONNECTION,
	entities: [User, Recipes, Comments],
	logging: true,
	synchronize: true,
});
