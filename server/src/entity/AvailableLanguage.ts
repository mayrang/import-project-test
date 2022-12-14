import {BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity} from "typeorm";
import { User } from "./User";



@Entity("availablelanguages")
export class AvailableLanguage extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({nullable: true})
    languageName: string;

    @Column()
    userId2: number;

    @ManyToOne(() => User, (user) => user.availableLanguages, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId2", referencedColumnName: "userId"})
    user: User;


}