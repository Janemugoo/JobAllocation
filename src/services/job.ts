import { Firestore, addDoc, collection, getDocs, query } from "firebase/firestore";

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
  async create(title: string, description: string, assigneeId: string) {
    return await addDoc(collection(this.store, "tasks"), {
      title,
      description,
      assigneeId,
    });
  }
  updateJob() {}
  deleteJob() {}
  getJobByStatus(jobStatus: JobStatus) {}
 getTasksForWeeks() {
    const tasks= query(collection(this.store, "tasks")) 
      return (tasks)
    
  }
}
