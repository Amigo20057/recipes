import "express";
import { ObjectId } from "mongodb";

declare module "express" {
	interface Request {
		userId?: ObjectId;
	}
}
