import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {IsEmail} from "class-validator";
import { AvailableLanguage } from "./AvailableLanguage";
import { AvailableFramework } from "./AvailableFramework";
import { ClubApplication } from "./ClubApplication";
import { Project } from "./Project";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Reservation } from "./Reservation";
import { Schedule } from "./Schedule";
import { ProjectPost } from "./ProjectPost";

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

    @OneToMany(() => AvailableLanguage, (availableLanguage) => availableLanguage.user, {cascade: true})
    availableLanguages: AvailableLanguage[];

    @OneToMany(() => AvailableFramework, (availableFramework) => availableFramework.user, {cascade: true})
    availableFrameworks: AvailableFramework[];

    @OneToMany(() => ClubApplication, (clubApplication) => clubApplication.user, {cascade: true})
    clubApplications: ClubApplication[];

    @ManyToMany(() => Project, (project) => project.users, {cascade: true})
    @JoinTable({
        name: "users_projects",
        joinColumn: {
            name: "userId",
            referencedColumnName: "userId"
        },
        inverseJoinColumn: {
            name: "projectId",
            referencedColumnName: "projectId"
        }
    })
    projects: Project[];

    @OneToMany(() => Project, (post) => post.users, {cascade: true})
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user, {cascade: true})
    comments: Comment[];

    @OneToMany(() => Reservation, (reservation) => reservation.user, {cascade: true})
    reservations: Reservation[];

    @OneToMany(() => Schedule, (schedule) => schedule.user, {cascade: true})
    schedules: Schedule[];

    @OneToMany(() => ProjectPost, (projectPost) => projectPost.user)
    projectPosts: ProjectPost[];
}