import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import {logger} from "./log";

const JWT_SECRET = process.env.JWT_SECRET;

export default (req: Request, res: Response, next: NextFunction) => {
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

	if (token) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload & {
				id: string;
			};
			req.userId = new ObjectId(decoded.id);
			next();
		} catch (error) {
			logger.error(error);
			res.status(403).json({ message: "No access" });
			return;
		}
	} else {
		res.status(403).json({ message: "No access" });
		return;
	}
};
