import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Comments {
	@ObjectIdColumn()
	id!: ObjectId;

	@Column()
	userId!: ObjectId;

	@Column()
	recipesId!: ObjectId;

	@Column()
	text!: string;

	@Column()
	createdAt!: Date;
}
