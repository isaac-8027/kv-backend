import { Role } from "./role.enum";
import { Request } from "express";
export interface RequestWithUser extends Request{
    name:string,
    email:string,
    role:Role
}