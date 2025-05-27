import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import path from "node:path";
import { AuthRouter } from "./controllers/auth.controller";
import { CommentsRouter } from "./controllers/comments.controller";
import { RecipesRouter } from "./controllers/recipes.controller";
import { UserRouter } from "./controllers/user.controller";
import { myDataSource } from "./db/app-data-source";
import { logger } from "./utils/log";

myDataSource
	.initialize()
	.then(() => {
		logger.info("Data Source has been initialized!");
	})
	.catch(err => {
		logger.error("Error during Data Source: ", err);
	});

const app = express();
const port = process.env.APPLICATION_PORT || 4000;
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads/")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.stack);
	res.status(500).json(err.stack);
});

app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/recipes", RecipesRouter);
app.use("/comments", CommentsRouter);

app.all("*", (req: Request, res: Response) => {
	res.status(404).json({ message: "Not found" });
});

app.listen(4000, "0.0.0.0", () => {
	console.log("Server running on port 4000");
});
