import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, limit, query, updateDoc, where, getDoc } from "firebase/firestore";

export class Job {
  public description?: string;
  public deadline?: Date;
  public status?: JobStatus;
  private store: Firestore;

  constructor(
    store: Firestore,
    description?: string,
    deadline?: Date,
    status?: JobStatus
  ) {
    this.description = description;
    this.deadline = deadline;
    this.status = status;
    this.store = store;
  }
  async create(title: string, description: string, assigneeName: string) {
    const taskID = await this.generateID();
    return await addDoc(collection(this.store, "tasks"), {
      title,
      description,
      assigneeName,
      taskID,
    });
  }
  async generateID() {
    //generateID This method generates a unique staff ID
    const tasksQuery = query(
      collection(this.store, "tasks"),

      limit(3)
    );

    const tasks = await getDocs(tasksQuery);

    if (!tasks.docs.length) return "TKN-001";
    const lastTask = tasks.docs.at(0)?.data();

    const [code, number] = lastTask?.taskID.split("-");
    const validNumber = parseInt(number) + 1;
    console.log(validNumber);
    return `${code}-00${validNumber}`;
  }

  getJobs() {
    const tasksQuery = query(collection(this.store, "tasks"));
    return tasksQuery;
  }


  getUnassignedJobs(){
    const tasksQuery=query(
      collection(this.store,"tasks"),
      where("assigneeName","==","")
    )
    return tasksQuery;
  }

  getTasksByUser(name: string) {
    const tasksQuery=query(
      collection(this.store,"tasks"),
      where("assigneeName","==",name)
    )
    return tasksQuery;
  }

  getTasksComments(id: string) {
    console.log(id)
    const tasksQuery=query(
      collection(this.store,"comments"),
      where("taskID","==",id)
    )
    return tasksQuery;
  }

  async getTasksById(id: string) {
    const docRef = doc(this.store, "tasks", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) return docSnap.data()
  }


  getAssignedJobs(){
    const tasksQuery=query(
      collection(this.store,"tasks"),
      where("assigneeName","!=","")
    )
    console.log(tasksQuery)
    return tasksQuery;

  }
  async updateTaskRow(
    docID: string,
    updatedFields: { title?: string; description?: string, assigneeName?:string }
  ) {
    console.log(updatedFields)
    const taskDocRef = doc(this.store, "tasks", docID);
    await updateDoc(taskDocRef, updatedFields);
  }
  async deleteTaskRow(docID: string) {
    const taskDocRef = doc(this.store, "tasks", docID);
    await deleteDoc(taskDocRef);
  }
  updateJob() {}
  deleteJob() {}
  getJobByStatus(jobStatus: JobStatus) {}
 getTasksForWeeks() {
    const tasks= query(collection(this.store, "tasks")) 
      return (tasks)
    
  }
}