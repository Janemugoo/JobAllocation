import { useJobs } from "@/hooks";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
export default function TaskTable() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const { tasks } = useJobs();
  console.log(tasks?.docs);
  const rows = useMemo(() => {
    if (!tasks?.docs.length) return [];

    return tasks.docs.map((doc) => {
      const task = doc.data();
      return {
        id: task.id,
        title: task.title,
        description:task.description,
        assigneeName: task.assigneeName,
      };
    });
  }, [tasks]);
  console.log(rows);

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
      />
      {/* Render tasks in a table */}
      <TableContainer component={Paper} className="smaller-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Title</TableCell>
              <TableCell align="right">Task Description</TableCell>
              <TableCell align="right">Assignee Name</TableCell>
              <TableCell align="right">Actions</TableCell>{" "}
              {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.assigneeName}</TableCell>
                <TableCell align="right">
                <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => {
                 // setSelectedStaff(row);
                  setCreateTaskDialogOpen(true);
                }}
              >
                <EditIcon /> 
                </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => console.log(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
function CreateTask({ open, close }: { open: boolean; close: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const[newTask, setNewTask] = useState("");
  const { tasks } = useJobs();
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

    //Task.create(title, description, assigneeId);

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
            if (!newValue) return;
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
