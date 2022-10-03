import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm";
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
    userId: number;

    @ManyToOne(() => User, (user) => user.projects, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User
}