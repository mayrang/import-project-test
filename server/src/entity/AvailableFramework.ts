import {BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity} from "typeorm";
import { User } from "./User";


@Entity("availableFrameworks")
export class AvailableFramework extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({nullable: true})
    framework: string;

    @Column()
    userId2: number;

    @ManyToOne(() => User, (user) => user.availableFrameworks)
    @JoinColumn({name: "userId2", referencedColumnName: "userId"})
    user: User;

}