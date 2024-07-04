import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import { EmployeeRepository } from "../repository/employee.repository";

export class EmployeeService{
 
    constructor(private employeeRepository:EmployeeRepository){
       
    }
    getAllEmployees=()=>{
        return this.employeeRepository.find();
    }
    getEmployeeByID=(id:number)=>{
        return this.employeeRepository.findOneBy({id});
    }
    createEmployee=(email:string,name:string,address:any,age:number)=>{
        const employee = new Employee();
        employee.email = email;
        employee.name = name;
        employee.age=age;

        const newEmployee = employee;
        const newAddress=new Address();
        newAddress.line=address.line;
        newAddress.pincode=address.pincode;

        newEmployee.address = newAddress;



        return this.employeeRepository.create(newEmployee);
    }
    deleteEmployee=(id:number)=>{
        return this.employeeRepository.removeBy({id});
    }
    updateAnEmployee=async(id:number,email:string,name:string)=>{
        const employees = await this.employeeRepository.findOneBy({id});
        
        employees.email = email;
        employees.name = name;
        return this.employeeRepository.create(employees);
    }

    

}