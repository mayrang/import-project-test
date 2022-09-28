import {BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity} from "typeorm";
import { User } from "./User";


@Entity("clubapplications")
export class ClubApplication extends BaseEntity {
    @PrimaryGeneratedColumn()
    clubApplicationId: number;

    @Column({nullable: true})
    reasonForApplication: string;

    @Column({nullable: true})
    projectExperience: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.clubApplications)
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;

}