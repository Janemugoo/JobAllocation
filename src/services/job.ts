export class Job {
  public description: string;
  public deadline: Date;
  public status: JobStatus;

  constructor(description: string, deadline: Date, status: JobStatus) {
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
  createJob() {}
  updateJob() {}
  deleteJob() {}
  getJobByStatus(jobStatus: JobStatus) {}
}
