import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exeptions";
import { EmployeeService } from "../service/employee.service";
import express, { NextFunction } from "express";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorize.middleware";
import { RequestWithUser } from "../utils/requestWithUSer";
import { Role } from "../utils/role.enum";

export class EmployeeController{
  
    public router:express.Router;
    constructor(private employeeService:EmployeeService){
     
        this.router=express.Router();
        this.router.get("/",authorize,this.getAllEmployees);
        this.router.get("/:id",authorize,this.getEmployeeByID);
        this.router.post("/",authorize,this.createNewEmployee);
        this.router.put("/:id", authorize,this.updateAnEmployee);
        this.router.delete("/:id",authorize,this.deleteAnEmployee);
        this.router.post("/login",this.loginEmployee)
        

    }
    public loginEmployee= async(req:RequestWithUser,
        res: express.Response,
        next: express.NextFunction)=>{
        try{
            const { email,password} = req.body;
            const token = await this.employeeService.loginEmployee(email,password);
            res.status(200).send({data:token}); 
        }catch (error){
            next(error);
        }



    }
    public getAllEmployees=async(req:RequestWithUser,
        res: express.Response,
        next: express.NextFunction)=>{
        try {
            const role = req.role;
          
          if (role != Role.HR) {
            

            throw new HttpException(403, "You are not authorized to create employee");
          }
            else{
            const employees = await this.employeeService.getAllEmployees();
            if (employees.length == 0) throw new HttpException(404, "No employees found");
            res.status(200).send(employees);
            }

        } catch (error) {
            next(error);
        }
    };

    public  getEmployeeByID=async(req:RequestWithUser,
        res: express.Response,
        next: express.NextFunction)=>{
        try{

            const role = req.role;
          
          if (role != Role.HR) {
            

            throw new HttpException(403, "You are not authorized to create employee");
          }
         else{ 
        const id=Number(req.params["id"] );
        const employee=await this.employeeService.getEmployeeByID(id);
        console.log('employee', employee);
        if(!employee){
            const error = new HttpException(404,
                `No employees found with ID:${req.params.id}`
            );
            throw error;
        }

        res.status(200).send(employee);
    }
    }
    catch(error){
        next(error);
    }
    }
    public createNewEmployee = async (
        req: RequestWithUser,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          const role = req.role;
          
          if (role != Role.HR) {
            

            throw new HttpException(403, "You are not authorized to create employee");
          }
          else{
    
          const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
          const errors = await validate(createEmployeeDto);
          if (errors.length ) {
            console.log(JSON.stringify(errors));
            throw new HttpException(400, JSON.stringify(errors));
          }
        const savedEmployee= await this.employeeService.createEmployee(
            createEmployeeDto.email,
            createEmployeeDto.name,
            createEmployeeDto.address,
            createEmployeeDto.age,
            createEmployeeDto.role,
            createEmployeeDto.password,
            createEmployeeDto.department
        )
        res.status(200).send(savedEmployee);
    }
    }
    catch(err)
    {
        next(err);
    }
    }
    
    public  updateAnEmployee=async(req:RequestWithUser,
        res: express.Response,
        next: express.NextFunction)=>{
        try{
            const role = req.role;
          
          if (role != Role.HR) {
            

            throw new HttpException(403, "You are not authorized to create employee");
          }else{
            const id=Number(req.params["id"] );
            const employeeDto=plainToInstance(CreateEmployeeDto,req.body)
            const errors= await validate(employeeDto)
            const employees=await this.employeeService.getEmployeeByID(id);
            if(!employees){
                const error = new HttpException(404,
                `No employees found with ID:${req.params.id}`
            );
            throw error;
        }
            if(errors.length){
                console.log(JSON.stringify(errors));
                throw new HttpException(400,JSON.stringify(errors));
            }
            const savedEmployee= await this.employeeService.updateAnEmployee(
                id,
                employeeDto.email,
                employeeDto.name,
                employeeDto.address,
                employeeDto.age,
                employeeDto.role,
                employeeDto.password,
                employeeDto.department
            )
            res.status(200).send(savedEmployee);
        }
        }
        catch(err)
        {
            next(err)
        }
            
    }
            


        
       
    
    public deleteAnEmployee= async(req:RequestWithUser,
        res: express.Response,
        next: express.NextFunction)=>{
            try{
                const role = req.role;
          
          if (role != Role.HR) {
            

            throw new HttpException(403, "You are not authorized to create employee");
          }
          else{
            const id=Number(req.params["id"] );
            const employee=await this.employeeService.getEmployeeByID(id);
            if(!employee){
                const error = new HttpException(404,
                `No employees found with ID:${req.params.id}`
            );
            throw error;            
        }
        const employees=await this.employeeService.removeEmployee(id);
        res.status(200).send(employees);    
    }
    }catch(err){
        next(err)
    }



}
}
export default EmployeeController;