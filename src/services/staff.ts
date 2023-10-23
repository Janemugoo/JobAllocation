import { Firestore, collection, query } from "firebase/firestore";
import { AssignedJob, Employee } from ".";

export class Staff extends Employee {
  public assignedJobs?: AssignedJob[];
  public comment?: Comment[];
  public department?: string;
  

  constructor(store:Firestore, department?: string, employee?: EmployeeOptions) {
    const { email, firstName, lastName, position, hiredDate } = employee ??{}; //destructure the employee obj obtain values
    super(store, firstName, lastName, email, position, hiredDate);
    this.department = department;
    
  }
  getAssignableStaff() {return query(collection(this.store, "staff")) }
  create() {}
  updateInformation() {}
  delete(){}
  retrive(){}
}
