import { initFirestore } from "@/constants/firebase"
import { Manager } from "@/services"
import { useMemo } from "react"

const store= initFirestore()
export function useManager () {
    const manager= useMemo(()=>new Manager(store),[]) 
    return {Manager:manager}
    

}