"use client";
import TaskPanel from "@/components/Accordion";
import { useGetTasksforWeeks, useJobs } from "@/hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function Page() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false); //manages open status of create task dialog
  const { Task } = useJobs();
  const { error, loading, tasks } = useGetTasksforWeeks();


  if (loading) return <div>Loading</div>;
  if (!tasks) return <div>Sorry something went wrong, No Task</div>;


  return (
    <>
      <main className="py-4 px-6 flex flex-col justify-center items-start gap-4 ">
        <div className="flex justify-between items-center w-full">
          <div>
            <Typography>Hello</Typography>
          </div>
          <div>
            <Button
              color="primary"
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
            {tasks.docs.map((number: any) => {
              return <TaskPanel key={number.id} />;
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
  const { Task } = useJobs();
  const [selectedName, setSelectedName] = useState("");
  const names = ["Jane", "Mark", "Wesley", "Sheila"]; //some sample names for the dropdown


  const createTask = () => {
    console.log(title, description);
    if (!title && !description) {
      return;
    }
    Task.create(title, description);
    setTitle("");
    setDescription("");
    setSelectedName("");
  };



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
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Describe the Task"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <Select
          autoFocus
          margin="dense"
          id="name"
          label="Select Employee"
          type="select"
          fullWidth
          variant="standard"
          value={selectedName}
          onChange={(event) => setSelectedName(event.target.value)}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createTask}>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}
