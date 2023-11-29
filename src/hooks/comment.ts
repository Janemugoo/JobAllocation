import { useState } from 'react';
import { CommentService } from '@/services';
import { initFirestore } from '@/constants/firebase';


export const useComment = () => {
  const [comments, setComments] = useState<string[]>([]);
  const store = initFirestore();
  const addComment = (taskID: string, comment: string) => {
    setComments((prevComments) => [...prevComments, comment]);
    CommentService.addComment(store, taskID, comment)
  };

  // You can add more functions for fetching, updating, or deleting comments here

  return {
    comments,
    addComment,
    // Add other functions here as needed
  };
};
