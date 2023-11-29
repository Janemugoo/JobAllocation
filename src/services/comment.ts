// src/services/CommentService.ts
import { Firestore, addDoc, collection } from "firebase/firestore";

export const CommentService = {
  addComment: async (store: Firestore, taskID: string, comment: string) => {
    try {
      // Create the 'comments' collection 
      const commentsCollection = collection(store, 'comments');
      await addDoc(commentsCollection, {
        taskID,
        comment,
        timestamp: new Date(),
      });

      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  },

  // You can add more functions for fetching, updating, or deleting comments here
};
