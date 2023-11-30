import { initFirestore } from "@/constants/firebase"
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const store = initFirestore()

export const Admin = {

    addAdmin: async (email: string) => {

        try {
            const commentsCollection = collection(store, 'admin');
        await addDoc(commentsCollection, {
            email,
          timestamp: new Date(),
        });
        } catch (error) {
            throw new Error("")
        }
        
    },
    
    getAdmin: async (email: string) => {

        const tasksQuery=query(
            collection(store,"admin"),
            where("email","==", email)
          )
        const docSnap = await getDocs(tasksQuery);

        const admin = docSnap.docs.at(0)

        if(admin) return admin.data()
    } 
}


export function useAdmin(){

    return {
        ...Admin
    }
}