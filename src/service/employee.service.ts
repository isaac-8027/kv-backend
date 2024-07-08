import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EntityNotFoundException from "../exceptions/entityNotFoundException";
import IncorrectPasswordException from "../exceptions/incorrectPasswordException";
import { EmployeeRepository } from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload.typ";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { ReturnDocument } from "typeorm";
import { DepartmentService } from "./department.service";
import { DepartmentRepository } from "../repository/department.repository";
import dataSource from "../db/data-source.db";
import Department from "../entity/department.entity";
export class EmployeeService{
 
    private departmentservice: DepartmentService;
    constructor(private employeeRepository: EmployeeRepository) {
      this.departmentservice = new DepartmentService(
        new DepartmentRepository(dataSource.getRepository(Department))
      );
    }
    loginEmployee=async(email:string,password: string)=>{
        const employee= await this.employeeRepository.findOneBy({email})
        if(!employee){
            throw new EntityNotFoundException(404,"Email Not Found")
        }
        const result= await bcrypt.compare(password,employee.password);
        if(!result){
            throw new IncorrectPasswordException(404,"Password is Incorrect")
        }
        const payload: jwtPayload ={
            name:employee.name,
            email:employee.email,
            role:employee.role
        }
        const token = jsonwebtoken.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY});
        return {token};
    }
    getAllEmployees=()=>{
        return this.employeeRepository.find();
    }
    getEmployeeByID=(id:number)=>{
        return this.employeeRepository.findOneBy({id});
    }
    createEmployee=async(email: string, name: string, address: any, age: number, role: Role, password: string, department: any)=>{
        const employee = new Employee();
        employee.email = email;
        employee.name = name;
        employee.age=age;
        employee.role=role;
        employee.password=password?await bcrypt.hash(password,10): "";
        console.log(employee.password)

        const newEmployee = employee;
        const newAddress=new Address();
        newAddress.line=address.line;
        newAddress.pincode=address.pincode;
        newEmployee.address = newAddress;

        const newDepartment=new Department();
        newDepartment.name=department.name;
        newEmployee.department = newDepartment;
        return this.employeeRepository.create(newEmployee);
    }
    
    removeEmployee=async(id:number)=>{
        const employee = await this.employeeRepository.findOneBy({id});
        return this.employeeRepository.softRemove(employee);

    }
    updateAnEmployee=async(id:number,email:string,name:string,address:any,age:number,role:Role,password:string,department:any)=>{
        const employees = await this.employeeRepository.findOneBy({id});
        
        employees.email = email;
        employees.name = name;
        employees.age=age;
        employees.role=role;
        employees.password=password?await bcrypt.hash(password,10): "";;
        
        employees.address.line=address.line;
        employees.address.pincode=address.pincode;
        employees.department.name=department.name;
        
        

        
        return this.employeeRepository.create(employees);
    }

    

}