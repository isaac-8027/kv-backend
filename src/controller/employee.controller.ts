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
        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeByID);
        this.router.post("/",authorize,this.createNewEmployee);
        this.router.put("/:id", this.updateAnEmployee);
        this.router.delete("/:id",this.deleteAnEmployee);
        this.router.post("/login",this.loginEmployee)
        

    }
    public loginEmployee= async(req:express.Request,res:express.Response,next:express.NextFunction)=>{

        
        const { email,password} = req.body;
        try{
            const token = await this.employeeService.loginEmployee(email,password);
            res.status(200).send({data:token}); 
        }catch (error){
            next(error);
        }



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
    public createNewEmployee = async (
        req: RequestWithUser,
        res: express.Response,
        next: NextFunction
      ) => {
        try {
          const role = req.role;
          if (role !== Role.HR) {
            throw new HttpException(403, "You are not authorized to create employee");
          }
    
          const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
          const errors = await validate(createEmployeeDto);
          if (errors.length > 0) {
            console.log(JSON.stringify(errors));
            throw new HttpException(400, JSON.stringify(errors));
          }
        const savedEmployee= await this.employeeService.createEmployee(
            createEmployeeDto.email,
            createEmployeeDto.name,
            createEmployeeDto.address,
            createEmployeeDto.age,
            createEmployeeDto.role,
            createEmployeeDto.password
        )
        res.status(200).send(savedEmployee);
    }
    catch(err)
    {
        next(err);
    }
    }
    
    public  updateAnEmployee=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        try{
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
                employeeDto.password
            )
            res.status(200).send(savedEmployee);
        }
        catch(err)
        {
            next(err)
        }
            
    }
            

        // const employees=await this.employeeService.updateAnEmployee(
        //     Number(req.params.id),
        //     req.body.email,
        //     req.body.name,
        //     req.body.address,
        //     req.body.age
        
       
    
    public deleteAnEmployee= async(req:express.Request,res:express.Response)=>{
        const id=Number(req.params["id"] );
        const employees=await this.employeeService.removeEmployee(id);
        res.status(200).send(employees);
    }


}
export default EmployeeController;