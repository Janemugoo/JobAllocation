interface EmployeeOptions{
     firstName?: string
     lastName?: string
     email?: string 
     position?: string
     hiredDate?: Date

     createEmployee:()=> void
     updateEmployeedetail:()=> void
     deleteEmployee:()=> void
     listEmployeeposition:()=> void
}
type JobStatus='InProgress'|'InReview'|'Completed'|'NotStarted'