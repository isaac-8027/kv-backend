import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import { DepartmentRepository } from "../../src/repository/department.repository";
import { DepartmentService } from "../../src/service/department.service";

describe("Department Service", () => {
    let departmentRepository: DepartmentRepository;
    let departmentService: DepartmentService;
    beforeAll(() => {
      const dataSource = {
        getRepository: jest.fn(),
      };
      departmentRepository = new DepartmentRepository(
        dataSource.getRepository(Department)
      ) as jest.Mocked<DepartmentRepository>;
      departmentService = new DepartmentService(departmentRepository);
    })
    it("should return all departments", async () => {
        const mockfn = jest.fn(departmentRepository.find).mockResolvedValue([]);
        departmentRepository.find = mockfn;
    
        const users = await departmentRepository.find();
    
        expect(users).toEqual([]);
        expect(mockfn).toHaveBeenCalledTimes(1);
      });
      it("should return a department", async () => {
        const mockfn = jest.fn();
        when(mockfn)
          .calledWith({ id: 1 })
          .mockResolvedValue({
           name: "developer"
          } as Department);
        departmentRepository.findOneBy = mockfn;
    
        const user1 = await departmentService.getDepartmentById(1);
        if (!user1) return;
        expect(user1.name).toEqual("developer");
      });
      it("should delete an employee", async () => {
        const mockfn1 = jest.fn();
        when(mockfn1)
          .calledWith({ id: 1 })
          .mockResolvedValue({
            id: 1,
            name:"developer"
          } as Department);
        departmentRepository.findOneBy = mockfn1;
    
        const mockfn2 = jest.fn();
        when(mockfn2)
          .calledWith({ id: 1 })
          .mockResolvedValue({
            id: 1,
            name: "developer"
          } as Department);
        departmentRepository.softRemove = mockfn2;
    
        const user1 = await departmentService.removeDepartment(1);
        expect(user1).toEqual(undefined);
      });
      it("should create a department", async () => {
        const mockDepartment: Partial<Department> = {
          name: "developer",
          
        };
        const mockfn = jest
          .fn(departmentRepository.create)
          .mockResolvedValue(mockDepartment as Department);
        departmentRepository.create = mockfn;
    
        const user1 = await departmentService.createDepartment(
         "developer" );

        expect(user1.name).toEqual("developer");
      });
      it("should update a department", async () => {
       
        const mockDepartment: Partial<Department> = {
          id: 1,
          name: "developer"
        };
        const mockfn1 = jest
          .fn(departmentRepository.create)
          .mockResolvedValue(mockDepartment as Department);
        departmentRepository.create = mockfn1;
    
        const mockfn2 = jest
          .fn(departmentRepository.findOneBy)
          .mockResolvedValue(mockDepartment as Department);
        departmentRepository.findOneBy = mockfn2;
    
        const user1 = await departmentService.updateDepartment(
          1,
          "tester"
        );
        expect(user1.name).toEqual("tester");
  });

      






});