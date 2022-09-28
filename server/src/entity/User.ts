import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {IsEmail} from "class-validator";
import { AvailableLanguage } from "./AvailableLanguage";
import { AvailableFramework } from "./AvailableFramework";
import { ClubApplication } from "./ClubApplication";
import { Project } from "./Project";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    
    @Column()
    nickname: string;

    @Column({nullable: true})
    studentId: string;

    @Column({nullable: true})
    department: string;

    @Column({nullable: true})
    grade: number;

    @Column({nullable: true})
    phoneNumber: string;

    @Column()
    level: string;

    @Column({unique: true})
    @IsEmail(undefined, {message: "이메일 형식으로 작성해야 합니다."})
    email: string;

    @Column({nullable: true})
    blog: string;

    @Column({nullable: true})
    fieldOfHope: string;

    @Column({nullable: true})
    jobObjective: string;

    @OneToMany(() => AvailableLanguage, (availableLanguage) => availableLanguage.user)
    availableLanguages: AvailableLanguage[];

    @OneToMany(() => AvailableFramework, (availableFramework) => availableFramework.user)
    availableFrameworks: AvailableFramework[];

    @OneToMany(() => ClubApplication, (clubApplication) => clubApplication.user)
    clubApplications: ClubApplication[];

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    @OneToMany(() => Project, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}