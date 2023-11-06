import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { Employee, Job } from ".";

export class Manager extends Employee {
  public jobs?: Job[];
  public comment?: Comment[];
  public department?: string;

  constructor(
    store: Firestore,
    department?: string,
    employee?: EmployeeOptions
  ) {
    const { email, firstName, lastName, position, hiredDate } = employee ?? {}; //destructure the employee obj obtain values
    super(store, firstName, lastName, email, position, hiredDate);
    this.department = department;
  }

  async create(managerName: string, managerDepartment: string) {
    const managerID = await this.generateID();
    return await addDoc(collection(this.store, "manager"), {
      managerName,
      managerDepartment,
      managerID,
    });
  }
  async generateID() {
    const managersQuery = query(
      collection(this.store, "manager"),
      limit(3)
    );
    const managers = await getDocs(managersQuery);
    console.log(managers);
    if (!managers.docs.length) return "MKN-001";
  }
  getManagers() {
    const managersQuery = query(collection(this.store, "manager"));
    return managersQuery;
  }
  updateInformation() {}
  delete() {}
  retrive() {}
}
