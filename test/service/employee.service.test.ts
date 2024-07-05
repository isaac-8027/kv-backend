import { getRepository } from "typeorm";
import {EmployeeRepository} from "../../src/repository/employee.repository"
import {EmployeeService} from "../../src/service/employee.service"
import Employee from "../../src/entity/employee.entity"
import { mock } from "node:test";
import {when} from "jest-when";
describe('Employee Service',()=>{
    let employeeRepository:EmployeeRepository;
    let employeeService:EmployeeService;
    beforeAll(()=>{
        const DataSource={
            getRepository:jest.fn()
        };
        employeeRepository = new EmployeeRepository(
            DataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        employeeService =new EmployeeService(employeeRepository);
    })
    it('should return allEmployess',async()=>{
        const mock=jest.fn();
        when(mock).calledWith({id:1})
        .mockResolvedValue({id:1,name:"issac",email:"issac@gmail.com",age:22,role:"Developer",address:{
            line: "", pincode:"680667"

        }}as Employee)
        employeeRepository.findOneBy=mock;
        const users = await employeeService.getEmployeeByID(1);
        if(!users) return;
        expect(users.name).toEqual("Isaac");
        expect(mock).toHaveBeenCalledTimes(1)
    })    

        })
    