import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity{
    
    @Column()
    email:string;

    @Column()
    name:string;

    @Column()
    age:number;
    
    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true,
        onDelete: "CASCADE"
      })
      address: Address;

      @ManyToOne(() => Department, (department) => department.employee)
      @JoinColumn({ name: "department_name", referencedColumnName: "name" })
      department: Department;
      
      @Column({nullable:true})
      role:Role;

      @Column({nullable:true})
      password:string
      @Column({nullable:true})
      experiance:string;
      @Column({nullable:true})
      statuss:string;
    
}
export default Employee;