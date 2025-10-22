import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { status } from "../interfaces/AppointmentIterfaces";


@Entity("appointments")
export class Appointment{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date", nullable: false})
    date: Date
    
    @Column({type:"varchar", length:5 , nullable:false})
    time: string

    @Column({type: "varchar",length:10, nullable:false,default:status.Active})
    status: status

    @ManyToOne(()=> User,user => user.appointments,{nullable:false})
    @JoinColumn()
    user:User

    @CreateDateColumn()
    createAt?: Date
  
    @UpdateDateColumn()
    updateAt? :Date

    
}