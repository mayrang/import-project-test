import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";


@Entity("reservations")
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    calendarId: number;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column({nullable: true})
    numberOfPeople: number;

    @Column()
    username: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.reservations, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;
    
}
