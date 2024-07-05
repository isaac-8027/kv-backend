import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/data-source.db";

export class EmployeeRepository{
    
    constructor(private repository: Repository<Employee>){
        
    }
    find=async()=>{
        
        return this.repository.find({relations:["address"]});
    }
    findOneBy=async (filter:Partial<Employee>)=>{
        
        return this.repository.findOne({where:filter,relations:["address"]});
    }
    create=async (newEmployee)=>{

        
        return this.repository.save(newEmployee);
    }
    removeBy=async (filter:FindOptionsWhere<Employee>)=>{
      
        return this.repository.softDelete(filter);
    }
    softRemove=async(employee:Employee)=>{
        return this.repository.softRemove(employee);
    }
   




}