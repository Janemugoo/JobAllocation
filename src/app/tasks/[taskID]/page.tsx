'use client'
import React from "react";
import { useParams } from "next/navigation";
import { initFirestore } from '@/constants/firebase';
import { useCollection } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";



export default function TaskDetails() {

  const router = useParams();
  //const { taskID } = useParams();
  const [taskID, loading, error] = useCollection(
    doc(firestore, 'useCollection', taskID)
  );

  return <div> TaskDetails</div>;
}
