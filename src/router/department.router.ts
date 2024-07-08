import { DataSource } from "typeorm";
import { EmployeeController } from "../controller/employee.controller";
import { EmployeeRepository } from "../repository/employee.repository";
import { EmployeeService } from "../service/employee.service";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import DepartmentController from "../controller/department.controller";
import { DepartmentService } from "../service/department.service";
import { DepartmentRepository } from "../repository/department.repository";
import Department from "../entity/department.entity";

const departmentController=new DepartmentController(new DepartmentService(new DepartmentRepository(dataSource.getRepository(Department))));
const departmentRouter = departmentController.router;
export default departmentRouter;
