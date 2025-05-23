import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
	@ObjectIdColumn()
	id!: ObjectId;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column()
	fullName!: string;

	@Column({ default: [] })
	likedPosts!: string[];

	@Column({ default: [] })
	followers!: string[];

	@Column({ default: [] })
	follows!: string[];
}
