"use clint"

import { initFirestore } from "@/constants/firebase"
import { Job } from "@/services/job"
import { useMemo } from "react"
import {useCollection} from "react-firebase-hooks/firestore"


export function useGetTasksforWeeks (){
    const store= initFirestore()
    const task= useMemo(()=>new Job(store),[])
    const[tasks, loading, error]= useCollection(task.getTasksForWeeks())

    
    return {tasks, loading, error}
}


export function useJobs () {
    const store= initFirestore()
    const task= useMemo(()=>new Job(store),[])
     
    return{
        Task:task
    }
}