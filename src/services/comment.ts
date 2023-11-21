// src/services/commentsService.ts
import { initFirestore } from "@/constants/firebase";

const store = initFirestore();

export const commentsService = {
  addComment: async (taskId: string, text: string) => {
    await store.collection("comments").add({
      taskId,
      text,
      createdAt: new Date(),
    });
  },
};
