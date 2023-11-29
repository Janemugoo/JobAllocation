'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { initFirestore } from '@/constants/firebase';
import { doc, DocumentData } from "firebase/firestore";
import { useComment, useJobs } from "@/hooks";
import { Button } from "@mui/material";



export default function TaskDetails() {
  const store = initFirestore()
  const [loading, setLoading] = useState<boolean>(true)
  const [details, setDetails] = useState<DocumentData>()
  const {task} = useJobs()
  const {addComment} = useComment()

  // const [data] = useCollection(task.getTaskByUser())

  const {taskID} = useParams<{taskID: string}>();
  //const { taskID } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);

    addComment(taskID, comment)
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  useEffect(() => {

    const getTask = async () => {
      if(loading){
        const detailsTask = await  task.getTasksById(taskID)
        const comments = await  task.getTasksComments(taskID)
        if(!detailsTask) return 
        setDetails(detailsTask)
        setLoading(false)
      }
    }

    getTask()

  }, [loading, task, taskID])


  if(loading)return <>Loading</>
  if(!details) return <>No Datils To show</>

  return (
    <div className="max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-4">Task Detail Page</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Task Name</h2>
        <p className="text-gray-700">{details.title}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Task Description</h2>
        <p className="text-gray-700">{details.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Task Description</h2>
        <p className="text-gray-700">{details.assigneeName}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="list-disc ml-4 text-gray-700">
              {comment}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
            className="p-2 border rounded mr-2"
          />
          <Button
          color="primary"
          variant="contained"
            onClick={handleAddComment}
            className="text-white p-2 rounded"
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
