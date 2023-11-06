import { useJobs } from "@/hooks";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function TaskTable() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<{
    id: string;
    title: string;
    description: string;
    assigneeName: string;
  }[]>([]);
  const [newTask, setNewTask] = useState([]);
  return (
    <>
      <div className="w-full flex flex-col items-start gap-2">
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
      <CreateTask
        close={() => {
          setCreateTaskDialogOpen(false);
        }}
        open={createTaskDialogOpen}
        // Pass the setTasks function to update tasks state
        updateTasks={(newTasks) => setTasks(newTasks)}
      />
      {/* Render tasks in a table */}
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Staff Name</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.assigneeName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
function CreateTask({
  open,
  close,
  updateTasks,
}: {
  open: boolean;
  close: () => void;
  updateTasks: (tasks: any[]) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const[newTask, setNewTask] = useState("");
  const { Task } = useJobs();
  const [assigneeId, setAssigneeId] = useState("");
  //const Autocomplete = ["Jane", "Mark", "Wesley", "Sheila"]; //some sample names for the dropdown
  const createTask = () => {
    console.log(title, description);
    if (!title && !description && !assigneeId) {
      return;
    }

    const newTask = {
      title: title,
      description: description,
      staffName: assigneeId,
    };

    Task.create(title, description, assigneeId);

    setTitle("");
    setDescription("");
    setAssigneeId("");

    // Close the dialog
    close();
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
          label="Task Title"
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
        {/* Replace options={[]} with the actual options for the Autocomplete component */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Jane", "Mark", "Wesley", "Sheila"]}
          sx={{ width: 500, length: 50 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Staff" />
          )}
          value={assigneeId}
          onChange={(event, newValue) => {
            if (!newValue) return
            setAssigneeId(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createTask}>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}
