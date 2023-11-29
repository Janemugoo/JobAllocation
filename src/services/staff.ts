import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { AssignedJob, Employee } from ".";

export class Staff extends Employee {
  public assignedJobs?: AssignedJob[];
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
  async create(staffName: string, staffDepartment: string) {
    const staffID = await this.generateID(); //This line calls the generateID method asynchronously to get a unique staff ID.
    return await addDoc(collection(this.store, "staff"), {
      //this line adds a new document to the "staff" collection in the Firestore database
      staffName,
      staffDepartment,
      staffID,
    });
  }
  async generateID() {
    //generateID This method generates a unique staff ID
    const staffsQuery = query(
      collection(this.store, "staff"),

      limit(3)
    );

    const staffs = await getDocs(staffsQuery);

    if (!staffs.docs.length) return "SKN-001";
    const lastStaff = staffs.docs.at(0)?.data();

    const [code, number] = lastStaff?.staffID.split("-");
    const validNumber = parseInt(number) + 1;
    console.log(validNumber);
    return `${code}-00${validNumber}`;
  }

  getAssignableStaff() {
    return query(collection(this.store, "staff"));
  }


  getStaffs() {
    const staffsQuery = query(collection(this.store, "staff"));
    return staffsQuery;
  }


  async updateStaffRow(
    docID: string,
    updatedFields: { staffName: string; staffDepartment: string }
  ) {
    const staffDocRef = doc(this.store, "staff", docID);
    await updateDoc(staffDocRef, updatedFields);
  }

  
  async deleteStaffRow(docID: string) {
    const staffDocRef = doc(this.store, "staff", docID);
    await deleteDoc(staffDocRef);
  }
  
  
  retrive() {}
}
