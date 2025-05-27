import { Request, Response, Router } from "express";
import {
	createComment,
	getCommentsByPostId,
} from "../services/comments.service";
import AuthCheck from "../utils/AuthCheck";
import { logger } from "../utils/log";

const router = Router();

router.get("/:postId", async (req: Request, res: Response) => {
	try {
		const postId = req.params.postId;
		const comments = await getCommentsByPostId(postId);
		res.status(200).json(comments);
	} catch (error) {
		logger.error("Error getting comments:", error);
		res.status(500).json({
			message: "Error getting comments",
			error: error instanceof Error ? error.message : String(error),
		});
	}
});

router.post("/:postId", AuthCheck, async (req: Request, res: Response) => {
	try {
		const postId = req.params.postId;
		const userId = req.userId;
		const { text } = req.body;
		await createComment(postId, userId!, text);
		res.status(200).json({ success: true });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error create comment" });
	}
});

export const CommentsRouter = router;
