import { Request, Response, Router } from "express";
import { findUserById, getUsers } from "../services/user.service";
import AuthCheck from "../utils/AuthCheck";
import { logger } from "../utils/log";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
	try {
		const users = await getUsers();
		res.status(200).json(users);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error get users" });
	}
});

router.get("/", AuthCheck, async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const user = await findUserById(userId!);
		res.status(200).json(user);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error get user" });
	}
});

export const UserRouter = router;
