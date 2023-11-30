import { initFirestore } from "@/constants/firebase"
import { addDoc, collection } from "firebase/firestore";

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
        
    }   
}


export function useAdmin(){

    return {
        ...Admin
    }
}