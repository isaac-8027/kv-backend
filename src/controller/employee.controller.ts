import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exeptions";
import { EmployeeService } from "../service/employee.service";
import express from "express";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";

export class EmployeeController{
  
    public router:express.Router;
    constructor(private employeeService:EmployeeService){
     
        this.router=express.Router();
        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeByID);
        this.router.post("/",this.createNewEmployee);
        this.router.put("/:id",this.updateAnEmployee);
        this.router.delete("/:id",this.deleteAnEmployee);

    }
    public getAllEmployees=async(req:express.Request,res:express.Response)=>{
        
        const employees=await this.employeeService.getAllEmployees()
        res.status(200).send(employees);
        
    }

    public  getEmployeeByID=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        try{

        const id=Number(req.params["id"] );
        const employees=await this.employeeService.getEmployeeByID(id);
        if(!employees){
            const error = new HttpException(404,
                `No employees found with ID:${req.params.id}`
            );
            throw error;
        }

        res.status(200).send(employees);
    }
    catch(error){
        next(error);
    }
    }
    public  createNewEmployee=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        try{
        const employeeDto=plainToInstance(CreateEmployeeDto,req.body)
        const errors= await validate(employeeDto)
        if(errors.length){
            console.log(JSON.stringify(errors));
            throw new HttpException(400,JSON.stringify(errors));
        }
        const savedEmployee= await this.employeeService.createEmployee(
            employeeDto.email,
            employeeDto.name,
            employeeDto.address,
            employeeDto.age
        )
        res.status(200).send(savedEmployee);
    }
    catch(err)
    {
        next(err);
    }
    }
    public deleteAnEmployee= async(req:express.Request,res:express.Response)=>{
        const id=Number(req.params["id"] );
        const employees=await this.employeeService.deleteEmployee(id);
        res.status(200).send(employees);
    }
    public  updateAnEmployee=async(req:express.Request,res:express.Response)=>{

        const employees=await this.employeeService.updateAnEmployee(
            Number(req.params.id),
            req.body.name,
            req.body.email
        );
        res.status(200).send(employees);

    }


}
export default EmployeeController;