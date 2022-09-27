import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm";
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

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;
}