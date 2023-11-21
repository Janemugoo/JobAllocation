"use client";
import TableComponent from "@/components/Accordion";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useGetTasksforWeeks, useJobs } from "@/hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function Page() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false); //manages open status of create task dialog
  const [todoList, setTodoList] = useState<string[]>([]); // State to manage the to-do list
  const { createTaskRow,tasks} = useJobs();
  const { error, loading, } = useGetTasksforWeeks();
  if (loading) return <div>Loading...</div>;
  if (!tasks) return <div>Sorry something went wrong, No Task</div>;
  return (
    <>
      <main className="py-4 px-6 flex flex-col justify-center items-start gap-4 ">
        <div className="flex justify-between items-center w-full">
          <div>
          <Typography
      variant="h6"
      color="primary"  // You can change the color to match your theme
      fontWeight="bold"
      textAlign="center"
      mt={3}  // Adjust the margin-top as needed
    >
      Check Your Assigned Task and Lets Get Going
    </Typography>
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
           <TableComponent/>
          </div>
          <div className="basis-1/4 bg-borderColor-primary p-4 rounded-md">
            <Calendar
              className="w-full border-2 border-solid border-gray-300 rounded-md mb-4"
              tileContent={({ date, view }) => {
                if (view === 'month' && date.getDate() === new Date().getDate()) {
                  return <div className="w-3 h-3 bg-brown-500 rounded-full mx-auto mt-1" />;
                }
                return null;
              }}
            />
           
          </div>
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
  const { createTaskRow } = useJobs();
  const [selectedName, setSelectedName] = useState("");
  //const Autocomplete = ["Jane", "Mark", "Wesley", "Sheila"]; //some sample names for the dropdown
  const createTask = () => {
    console.log(title, description);
    if (!title && !description && !selectedName) {
      return;
    }
    createTaskRow(title, description, selectedName);
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[]}
          sx={{ width: 500, length: 50}}
          renderInput={(params) => <TextField {...params} label="Select Staff" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createTask}>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}
