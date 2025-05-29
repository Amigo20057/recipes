import { Request, Response, Router } from "express";
import {
	findUserById,
	findUserByPostId,
	getUsers,
	toggleSubscribe,
} from "../services/user.service";
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

router.get("/profile/:postId", async (req: Request, res: Response) => {
	try {
		const postId = req.params.postId;
		const user = await findUserByPostId(postId);
		res.status(200).json(user);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error get user by post id" });
	}
});

router.post(
	"/subscribe/:userId",
	AuthCheck,
	async (req: Request, res: Response) => {
		try {
			const targetUserId = req.params.userId;
			const userId = req.userId;
			await toggleSubscribe(targetUserId, userId!);
			res.status(200).json({ success: true });
		} catch (error) {
			logger.error(error);
			res.status(500).json({ message: "Error subscribe" });
		}
	}
);

export const UserRouter = router;
