import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("comments")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    comment: string;

    @Column()
    username: string;

    @CreateDateColumn()
    commentTime: Date;

    @Column()
    userId: number;

    @Column()
    postId: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({name: "postId", referencedColumnName: "postId"})
    post: Post
}