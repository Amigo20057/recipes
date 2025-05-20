import "dotenv/config";
import { DataSource } from "typeorm";
import { Recipes } from "../entity/recipes.entity";
import { User } from "../entity/user.entity";

export const myDataSource = new DataSource({
	type: "mongodb",
	url: process.env.DATABASE_CONNECTION,
	entities: [User, Recipes],
	logging: true,
	synchronize: true,
});
