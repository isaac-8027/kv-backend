import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity{
    
    @Column({nullable:true})
    line:string;
    
    @Column({nullable:true})
    pincode:string;
    
    @OneToOne(() => Employee, (employee) => employee.address)
    @JoinColumn()
    employee: Employee;
    
}
export  default Address;