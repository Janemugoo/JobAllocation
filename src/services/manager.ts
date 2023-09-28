import { Employee, Job } from ".";

export class Manager extends Employee {
  public jobs?: Job[];
  public comment?:Comment[];
  public department: string;

  constructor(department: string, employee: EmployeeOptions) {
    const { email, firstName, lastName, position, hiredDate } = employee; //destructure the employee obj obtain values
    super(firstName, lastName, email, position, hiredDate);
    this.department = department;
  }
  create() {}
  updateInformation() {}
  delete(){}
  retrive(){}
}
