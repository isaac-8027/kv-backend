import { EmployeeRepository } from "../../src/repository/employee.repository";
import { EmployeeService } from "../../src/service/employee.service";
import Employee from "../../src/entity/employee.entity";
import { when } from "jest-when";
import { Role } from "../../src/utils/role.enum";
import Address from "../../src/entity/address.entity";
import Department from "../../src/entity/department.entity";

describe("Employee Service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;
  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(employeeRepository);
  });

  it("should return all employees", async () => {
    const mockfn = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mockfn;

    const users = await employeeRepository.find();

    expect(users).toEqual([]);
    expect(mockfn).toHaveBeenCalledTimes(1);
  });

  it("should return an employee", async () => {
    const mockfn = jest.fn();
    when(mockfn)
      .calledWith({ id: 1 })
      .mockResolvedValue({
        id: 1,
        name: "Isaac",
        email: "isaac@gmail.com",
        age: 22,
        role: "Developer",
        address: {
          line: "Muvattupuzha",
          pincode: "680687",
        },
      } as Employee);
    employeeRepository.findOneBy = mockfn;

    const user1 = await employeeService.getEmployeeByID(1);
    if (!user1) return;
    expect(user1.name).toEqual("Isaac");
  });
  it("should delete an employee", async () => {
    const mockfn1 = jest.fn();
    when(mockfn1)
      .calledWith({ id: 1 })
      .mockResolvedValue({
        id: 1,
        name: "Isaac",
        email: "isaac@gmail.com",
        age: 22,
        role: "Developer",
        address: {
          line: "Muvattupuzha",
          pincode: "680687",
        },
      } as Employee);
    employeeRepository.findOneBy = mockfn1;

    const mockfn2 = jest.fn();
    when(mockfn2)
      .calledWith({ id: 1 })
      .mockResolvedValue({
        id: 1,
        name: "Isaac",
        email: "isaac@gmail.com",
        age: 22,
        role: "Developer",
        address: {
          line: "Muvattupuzha",
          pincode: "680687",
        },
      } as Employee);
    employeeRepository.softRemove = mockfn2;

    const user1 = await employeeService.removeEmployee(1);
    expect(user1).toEqual(undefined);
  });
  it("should create an employee", async () => {
    let mockAddress = new Address();
    mockAddress.line = "Muvattupuzha";
    mockAddress.pincode = "680687";
    let mockDepartment = new Department();
    mockDepartment.name = "Human Resources";
    const mockEmployee: Partial<Employee> = {
      name: "isaac",
      email: "isaac@gmail.com",
      age: 22,
      role: Role.HR,
      address: mockAddress,
      department: mockDepartment,
    };
    const mockfn = jest
      .fn(employeeRepository.create)
      .mockResolvedValue(mockEmployee as Employee);
    employeeRepository.create = mockfn;

    const user1 = await employeeService.createEmployee(
      "isaac@gmail.com",
      "isaac",
      mockAddress,
      22,
      Role.UI,
      "isaac@007",
      mockDepartment
    );
    expect(user1.name).toEqual("isaac");
  });
  it("should update an employee", async () => {
    let mockAddress = new Address();
    mockAddress.line = "Muvattupuhza";
    mockAddress.pincode = "680687";
    let mockDepartment = new Department();
    mockDepartment.name = "Human Resources";
    const mockEmployee1: Partial<Employee> = {
      id: 1,
      name: "Isaac",
      email: "isaac@gmail.com",
      age: 22,
      role: Role.HR,
      address: mockAddress,
      department: mockDepartment,
    };
    const mockfn1 = jest
      .fn(employeeRepository.create)
      .mockResolvedValue(mockEmployee1 as Employee);
    employeeRepository.create = mockfn1;

    const mockfn2 = jest
      .fn(employeeRepository.findOneBy)
      .mockResolvedValue(mockEmployee1 as Employee);
    employeeRepository.findOneBy = mockfn2;

    const user1 = await employeeService.updateAnEmployee(
      1,
      "isaac@gmail.com",
      "Cherian",
      mockAddress,
      22,
      Role.UI,
      "isaac@007",
      mockDepartment
    );

    expect(user1.name).toEqual("Cherian");
  });
});