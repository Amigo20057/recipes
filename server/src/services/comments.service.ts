import { ObjectId } from "mongodb";
import { myDataSource } from "../db/app-data-source";
import { Comments } from "../entity/comments.entity";
import { Recipes } from "../entity/recipes.entity";
import { User } from "../entity/user.entity";

export const getCommentsByPostId = async (
	postId: string
): Promise<
	{
		comment: Comments;
		user: User;
	}[]
> => {
	const objectId = new ObjectId(postId);
	const commentsRepo = myDataSource.getMongoRepository(Comments);
	const userRepo = myDataSource.getMongoRepository(User);

	const comments = await commentsRepo.find({
		where: { recipesId: objectId },
	});

	const sortedComments = comments.sort(
		(a, b) =>
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	const commentsWithUsers = await Promise.all(
		sortedComments.map(async comment => {
			const user = await userRepo.findOneBy({
				_id: new ObjectId(comment.userId),
			});
			if (!user) {
				throw new Error(`User not found for comment ${comment.id}`);
			}
			return { comment, user };
		})
	);

	return commentsWithUsers;
};

export const createComment = async (
	postId: string,
	userId: string | ObjectId,
	text: string
) => {
	const objectUserId = new ObjectId(userId);
	const objectPostId = new ObjectId(postId);

	const recipesRepo = myDataSource.getRepository(Recipes);
	const commentsRepo = myDataSource.getRepository(Comments);

	const recipe = await recipesRepo.findOne({
		where: {
			// @ts-ignore
			_id: objectPostId,
		},
	});

	if (!recipe) {
		throw new Error("Post not found");
	}

	recipe.countComments += 1;
	await recipesRepo.save(recipe);

	return await commentsRepo.save({
		text,
		recipesId: objectPostId,
		userId: objectUserId,
		createdAt: new Date(),
	});
};
