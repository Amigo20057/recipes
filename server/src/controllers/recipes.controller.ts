import { Request, Response, Router } from "express";
import {
	createRecipe,
	// deleteRecipe,
	// filterRecipe,
	// updateRecipe,
	getRecipe,
	getRecipes,
	getUserRecipes,
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
			const picture = await createRecipe(req.body, userId!, pictureUrl);
			res.status(200).json(picture);
		} catch (error) {
			logger.error(error);
			res.status(500).json({ message: "Error create recipe" });
		}
	}
);

router.get("/", async (req: Request, res: Response) => {
	try {
		const recipes = await getRecipes();
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

router.get("/my-recipes", AuthCheck, async (req: Request, res: Response) => {
	try {
		const recipes = await getUserRecipes(req.userId!);
		res.status(200).json(recipes);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Error get recipe" });
	}
});

// router.delete("/:id", async (req: Request, res: Response) => {
// 	try {
// 		await deleteRecipe(String(req.params.id));
// 	} catch (error) {
// 		logger.error(error);
// 		res.status(500).json({ message: "Error delete recipe" });
// 	}
// });

// router.patch("/", AuthCheck, async (req: Request, res: Response) => {
// 	try {
// 		const { id, title, description, tags } = req.body;
// 		const updatedRecipe = await updateRecipe(id, title, description, tags);
// 		res.status(200).json(updatedRecipe);
// 	} catch (error) {
// 		logger.error(error);
// 		res.status(500).json({ message: "Error update recipe" });
// 	}
// });

// router.get("/", async (req: Request, res: Response) => {
// 	try {
// 		const title =
// 			typeof req.query.title === "string" ? req.query.title : undefined;
// 		let tags: string[] | undefined;

// 		if (typeof req.query.tags === "string") {
// 			tags = [req.query.tags];
// 		} else if (Array.isArray(req.query.tags)) {
// 			tags = req.query.tags as string[];
// 		}

// 		const recipes = await filterRecipe(title, tags);
// 		res.status(200).json(recipes);
// 	} catch (error) {
// 		logger.error(error);
// 		res.status(500).json({ message: "Error update recipe" });
// 	}
// });

export const RecipesRouter = router;
