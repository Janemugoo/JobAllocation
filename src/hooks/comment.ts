// src/hooks/useComments.ts
import { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { initFirestore } from "@/constants/firebase";

const store = initFirestore();

export function useComments(taskId: string | null) {
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    if (!taskId) return;

    const fetchData = async () => {
      const commentsRef = store.collection("comments").where("taskId", "==", taskId);
      const commentsSnapshot = await commentsRef.get();

      const commentsData = commentsSnapshot.docs.map((doc) => doc.data().text);
      setComments(commentsData);
    };

    fetchData();
  }, [taskId]);

  const addComment = async (text: string) => {
    if (!taskId) return;

    await store.collection("comments").add({
      taskId,
      text,
      createdAt: new Date(),
    });

    // Refresh comments after adding a new comment
    fetchData();
  };

  return { comments, addComment };
}
