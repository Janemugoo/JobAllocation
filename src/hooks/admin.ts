import { initFirestore } from "@/constants/firebase"
import { addDoc, collection, doc, getDoc, query, where } from "firebase/firestore";

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
        
    }  ,
    getAdmin: async (email: string) => {
        const docRef = doc(store, "admin", email);
        const docSnap = await getDoc(docRef);
    
        if(docSnap.exists()) return docSnap.data()
    } 
}


export function useAdmin(){

    return {
        ...Admin
    }
}