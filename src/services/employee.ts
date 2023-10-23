import { Firestore } from "firebase/firestore";

export abstract class Employee implements EmployeeOptions {
  //one can never create a new employee
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public position?: string;
  public hiredDate?: Date;
   store: Firestore;
  constructor(
    store: Firestore,
    firstName?: string,
    lastName?: string,
    email?: string,
    position?: string,
    hiredDate?: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.position = position;
    this.hiredDate = hiredDate;
    this.store = store;
  } //this function is called everytime you create a new employee

  createEmployee() {}
  updateEmployeedetail() {}
  deleteEmployee() {}
  listEmployeeposition() {}
}
