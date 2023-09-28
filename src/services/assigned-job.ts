import { Job, Staff } from ".";

export class AssignedJob {
    public jobs?: Job[];
    public staff?: Staff[];
    public assignedDate?:Date;
    
    
    constructor ( assignedDate?:Date, ){
this.assignedDate=assignedDate;

    }
assignJob() {}
unassignedJob() {}
}