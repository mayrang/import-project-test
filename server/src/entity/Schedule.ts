import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"; 
import { User } from "./User";


@Entity("schedules")
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    calendarId: number;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    content: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.schedules, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;
}