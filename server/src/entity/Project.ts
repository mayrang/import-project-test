import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, CreateDateColumn, OneToMany} from "typeorm";
import { ProjectPost } from "./ProjectPost";
import { User } from "./User";

@Entity("projects")
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    projectId: number;

    @Column()
    postTitle: string;

    @Column()
    main: string;

    @Column()
    username: string;

    @CreateDateColumn()
    postTime: Date;

    @Column()
    fieldTags: string;

    @Column()
    stateTags: string;

    @Column()
    userId: number;

    @ManyToMany (() => User, (user) => user.projects, {onDelete: "CASCADE"})
    @JoinTable()
    users: User[];

    @OneToMany(() => User, (user) => user.projectPosts)
    projectPosts: ProjectPost[];
}