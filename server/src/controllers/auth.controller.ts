import { Request, Response, Router } from "express";
import { login, register } from "../services/auth.service";
import { logger } from "../utils/log";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
	try {
		const user = await register(req.body);
		res.status(200).json(user);
	} catch (error) {
		logger.error("Error register user: ", error);
		res.status(500).json({ message: "Error register user" });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await login(email, password);
		res.status(200).json(user);
	} catch (error) {
		logger.error("Error login user: ", error);
		res.status(500).json({ message: "Error login user" });
	}
});

export const AuthRouter = router;
