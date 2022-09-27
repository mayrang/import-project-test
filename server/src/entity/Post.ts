import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    postTitle: string;

    @Column()
    main: string;

    @Column()
    username: string;

    @CreateDateColumn()
    postTime: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User
}