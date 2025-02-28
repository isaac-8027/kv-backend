import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { CreateAddressDto } from "./address.dto"
import Address from "../entity/address.entity"
import { Type } from "class-transformer"
import "reflect-metadata"
import { Role } from "../utils/role.enum"
import { CreateDepartmentDto } from "./department.dto"
export class CreateEmployeeDto{
    
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email:string

    @IsNotEmpty()
    @IsNumber()
    age:number
    
    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    @IsEnum(Role)
    role:Role

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    address:CreateAddressDto;
    
    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=> CreateDepartmentDto)
    department:CreateDepartmentDto

    @IsNotEmpty()
    @IsString()
    experiance:string

    @IsNotEmpty()
    @IsString()
    statuss:string


}