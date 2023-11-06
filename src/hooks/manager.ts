import { initFirestore } from "@/constants/firebase"
import { Manager } from "@/services"
import { useMemo } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

const store= initFirestore()
export function useManager () {
    const manager= useMemo(()=>new Manager(store),[]) 
    return {Manager:manager}
    

}
export function useGetManagers() {
    const manager= useMemo(()=>new Manager(store),[]) 
    const[managers, loading, error]= useCollection(manager.getManagers())
    return {managers, loading, error}

}