import { Job } from "@/services/job"
import { useMemo } from "react"

export function useJobs () {
    const task= useMemo(()=>new Job(),[]) 
    return{
        Task:task
    }
}