"use clint";

import { initFirestore } from "@/constants/firebase";
import { Job } from "@/services/job";
import { title } from "process";
import { useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export function useGetTasksforWeeks() {
  const store = initFirestore();
  const task = useMemo(() => new Job(store), []);
  const [tasks, loading, error] = useCollection(task.getTasksForWeeks());

  return { tasks, loading, error };
}

export function useJobs() {
  const store = initFirestore();
  const task = useMemo(() => new Job(store), []);
  const [tasks] = useCollection(task.getJobs());
  const[unassignedJobs]= useCollection(task.getUnassignedJobs());
  const[assignedJobs]=useCollection(task.getAssignedJobs());
  const [taskRowId, setTaskRowId] = useState<string | null>(null);
  const [taskFields, setTaskFields] = useState({
    title: "",
    description: "",

  });
  const updateTaskRow = async (docID: string, updatedFields: {title?: string; description?: string, assigneeName?:string }) => {
    //check on the type, updateManagerRow responsible for updating the manager row
    await task.updateTaskRow(docID, updatedFields);
    setTaskRowId(null);
  };
  const deleteTaskRow = async (taskID: string) => {
    await task.deleteTaskRow(taskID);
  };
  const createTaskRow = async (
    title: string,
    description: string,
    assigneeName: string
  ) => {
    await task.create(title, description, assigneeName);
  };


 
  return {
    task,
    tasks,
    createTaskRow,
    deleteTaskRow,
    taskRowId,
    taskFields,
    setTaskRowId,
    setTaskFields,
    updateTaskRow,
    unassignedJobs,
    assignedJobs
  };
}
