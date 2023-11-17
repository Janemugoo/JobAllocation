import { useJobs, useStaff } from "@/hooks";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  selectClasses,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteIcon from "@mui/icons-material/Delete";
import { title } from "process";

export default function TaskTable() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<null | string>(null);
  const {
    tasks,
    deleteTaskRow,
    taskRowId,
    taskFields,
    setTaskRowId,
    setTaskFields,
    updateTaskRow,
  } = useJobs();

  const { staffNames } = useStaff();

  const rows = useMemo(() => {
    if (!tasks?.docs.length) return [];

    return tasks.docs.map((doc) => {
      const task = doc.data();
      return {
        id: task.taskID,
        title: task.title,
        description: task.description,
        assigneeName: task.assigneeName,
        docID: doc.id,
      };
    });
  }, [tasks]);
  const handleAssignee = async(staffName: string, taskID:string) => {
    if (!staffNames) return;
   
await updateTaskRow (taskID,{assigneeName:staffName})
  };
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
        open={createTaskDialogOpen}
        isEditing={Boolean(taskRowId)}
        taskID={taskRowId}
        close={() => {
          setTaskFields({ title: "", description: "" });
          setCreateTaskDialogOpen(false);
        }}
        initialData={taskFields}
      />
      {/* Render tasks in a table */}
      <TableContainer component={Paper} className="smaller-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Title</TableCell>
              <TableCell align="center">Task Description</TableCell>
              <TableCell align="right">Task ID</TableCell>
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
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="assign"
                    color="primary"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    <AssignmentIndIcon />
                  </IconButton>
                  <Menu
                    onChange={(idk) => {}}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    {staffNames?.map((staff) => {
                      const docID = row.docID;
                      return (
                        <MenuItem
                          key={staff.name}
                          selected={staff.name === selectedAssignee}
                          onClick={() => {

                            setSelectedAssignee(staff.name);
                            handleAssignee(staff.name, row.docID, );
                          }}
                        >
                          {staff.name}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => {
                      setTaskFields({
                        title: row.title,
                        description: row.description,
                      });
                      setTaskRowId(row.docID);
                      setCreateTaskDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => deleteTaskRow(row.docID)}
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
function CreateTask({
  open,
  close,
  initialData,
  isEditing,
  taskID,
}: {
  open: boolean;
  close: () => void;
  initialData: any;
  isEditing: boolean;
  taskID: string | null;
}) {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(
    initialData ? initialData.description : ""
  );
  //const[newTask, setNewTask] = useState("");
  const { tasks, updateTaskRow, createTaskRow } = useJobs();
  useEffect(() => {
    //updates the form fields whenever initialData changes
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);
  const updateTask = () => {
    if (!taskID) return;
    updateTaskRow(taskID, { title, description, assigneeName: "" });
  };
  const [assigneeId, setAssigneeId] = useState("");
  //const Autocomplete = ["Jane", "Mark", "Wesley", "Sheila"]; //some sample names for the dropdown
  const createTask = () => {
    console.log(title, description);
    if (!title && !description && !assigneeId) {
      return;
    }
    createTaskRow(title, description, assigneeId);
    setTitle("");
    setDescription("");
    setAssigneeId("");

    close();
  };
  const handleClick = () => {
    if (isEditing) return updateTask();
    return createTask();
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
        <Button onClick={handleClick}>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}
