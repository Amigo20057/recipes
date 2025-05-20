import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Recipes {
	@ObjectIdColumn()
	id!: ObjectId;

	@Column()
	userId!: ObjectId;

	@Column()
	title!: string;

	@Column()
	description!: string;

	@Column()
	categories!: string[];

	@Column()
	tags?: string[];

	@Column()
	cookingTime!: string;

	@Column()
	picture!: string;

	@Column()
	createdAt!: Date;

	@Column()
	countLikes!: number;

	@Column()
	countComments!: number;

	@Column()
	countShares!: number;
}
