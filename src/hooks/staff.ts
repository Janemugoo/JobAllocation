import { initFirestore } from "@/constants/firebase";
import { Staff} from "@/services";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const store= initFirestore()
export function useStaff (){
    const staff= useMemo(()=>new Staff(store),[])
return {
    Staff:staff
}
}

export function useAssignableStaff(){
   const staff= useMemo(()=>new Staff(store),[])
   const [tasks, loading, error]= useCollection(staff.getAssignableStaff())
    return {
        
    }
}