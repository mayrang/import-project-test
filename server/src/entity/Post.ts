import {Entity, BaseEntity, OneToMany, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    postTitle: string;

    @Column("longtext")
    main: string;

    @Column()
    username: string;

    @CreateDateColumn()
    postTime: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.posts, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User

    @OneToMany(() => Comment, (comment) => comment.user, {cascade: true})
    comments: Comment[];
}