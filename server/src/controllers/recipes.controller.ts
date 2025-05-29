import { Request, Response, Router } from "express";
import {
	createRecipe,
	getFollowRecipes,
	getRecipe,
	getRecipes,
	getUserRecipes,
	likeRecipe,
} from "../services/recipes.service";
import AuthCheck from "../utils/AuthCheck";
import { logger } from "../utils/log";
import { uploadPictures } from "../utils/multer";

const router = Router();

router.post(
	"/create",
	AuthCheck,
	uploadPictures.single("picture"),
	async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No file uploaded" });
				return;
			}
			const userId = req.userId;
			const pictureUrl = `../uploads/recipes-uploads/${req.file.filename}`;
			const recipe = await createRecipe(req.body, userId!, pictureUrl);
			res.status(200).json(recipe);
		} catch (error) {
			logger.error(error);
			res.status(500).json({ message: "Error create recipe" });
		}
	}
);

router.get("/", async (req: Request, res: Response) => {
	try {
		const rawCategory = req.query.category;
		const category =
			typeof rawCategory === "string" ? rawCategory.trim() : undefined;

		const recipes = await getRecipes(category);
		res.status(200).json(recipes);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error get recipes" });
	}
});

router.get(`/:id`, async (req: Request, res: Response) => {
	try {
		const id = String(req.params.id);
		const recipe = await getRecipe(id);
		res.status(200).json(recipe);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error get recipe" });
	}
});

router.get("/my/recipes", AuthCheck, async (req: Request, res: Response) => {
	try {
		const recipes = await getUserRecipes(req.userId!);
		res.status(200).json(recipes);
	} catch (error) {
		res.status(500).json({ message: "Error get recipes", error: error });
	}
});

router.post("/like/:id", AuthCheck, async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const postId = String(req.params.id);
		await likeRecipe(userId!, postId);
		res.status(200).json({ success: true });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error like recipe" });
	}
});

router.get(
	"/follow/recipes",
	AuthCheck,
	async (req: Request, res: Response) => {
		try {
			const recipes = await getFollowRecipes(req.userId!);
			logger.info(recipes);
			res.status(200).json(recipes);
		} catch (error) {
			res.status(500).json({
				message: "Error get recipes",
				error: error,
			});
		}
	}
);

export const RecipesRouter = router;
