"use client";
import TaskPanel from "@/components/Accordion";
import { useJobs } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Page() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false); //manages open status of create task dialog
  return (
    <>
      <main className="py-4 px-6 flex flex-col justify-center items-start gap-4 ">
        <div className="flex justify-between items-center w-full">
          <div>
            <Typography>Hello</Typography>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setCreateTaskDialogOpen(true);
              }}
            >
              Add Task
            </Button>
          </div>{" "}
          {/**opens the create task dialog onclick */}
        </div>
        <div className="flex gap-4 justify-items-center justify-normal w-full">
          <div className=" basis-3/4">
            {[1, 2, 3, 4].map((number) => {
              return <TaskPanel key={number} />;
            })}
            <TaskPanel />
          </div>
          <div className="basis-1/4">Hello World</div>
        </div>
      </main>
      <CreateTask
        close={() => {
          setCreateTaskDialogOpen(false);
        }}
        open={createTaskDialogOpen}
      />
    </>
  );
}
function CreateTask({ open, close }: { open: boolean; close: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {Task}= useJobs()
  const createTask =()=>{
    console.log(title, description)
    if (!title && !description) {
      return
    }
    Task.create(title,description)
  }
  return (
    <Dialog onClose={close} open={open}>
     
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form below to create a task.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Task Tittle"
          type="text"
          fullWidth
          variant="standard"
          value={title} onChange ={(event)=>{setTitle(event.target.value)}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Describe the Task"
          type="text"
          fullWidth
          variant="standard"
          value={description} onChange ={(event)=>{setDescription(event.target.value)}}
        />
       
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createTask}>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}
