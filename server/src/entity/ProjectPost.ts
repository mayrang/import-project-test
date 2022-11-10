import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";


@Entity("projectposts")
export class ProjectPost extends BaseEntity {
    @PrimaryGeneratedColumn()
    projectPostId: number;

    @Column()
    main: string;

    @Column()
    postDate: Date;

    @Column()
    userId: number;

    @Column()
    projectId: number;
    
    @ManyToOne(() => User, (user) => user.projectPosts, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;

    @ManyToOne(() => Project, (project) => project.projectPosts, {onDelete: "CASCADE"})
    @JoinColumn({name: "projectId", referencedColumnName: "projectId"})
    project: Project;
}

