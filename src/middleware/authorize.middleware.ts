import { NextFunction } from "express";
import { JWT_SECRET } from "../utils/constants";
import { RequestWithUser } from "../utils/requestWithUSer";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload.typ";
import express from "express";
const authorize =async(
    req:RequestWithUser,
    res: express.Response,
    next: express.NextFunction
)=>{
    try{
        const token = getTokenFromRequestHeader(req);
        console.log(token)
        const payload = jsonwebtoken.verify(token, JWT_SECRET);
        req.name=(payload as jwtPayload).name;
        req.email=(payload as jwtPayload).email;
        req.role=(payload as jwtPayload).role;
        const role=req.role;
        return next();
    }catch (error){
        return next(error);
    }
}
const getTokenFromRequestHeader = (req: RequestWithUser)=>{
    const bearerToken=req.header("Authorization");
    const token=bearerToken ? bearerToken.replace("Bearer ",""):"";
    return token;

}
export default authorize;