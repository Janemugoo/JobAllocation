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
import React, { useEffect, useMemo, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Material-UI Download icon

import CommentDialog from "./CommentDialog";
import { AssignTask } from "./AssignTask";
import jsPDF from "jspdf"; // Import the main jsPDF library
import html2canvas from "html2canvas";
import { useComment } from "@/hooks/comment";
import { useRouter } from "next/navigation";

export default function TaskTable() {
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const [assignTaskDialogOpen, setAssignTaskDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedTaskForComment, setSelectedTaskForComment] = useState<
    null | string
  >(null);

  const {
    tasks,
    deleteTaskRow,
    taskRowId,
    taskFields,
    setTaskRowId,
    setTaskFields,
    updateTaskRow,
  } = useJobs();
  const pdfRef = useRef(null);
  const { staffNames } = useStaff();
  const { addComment } = useComment();
  const router = useRouter()
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
  const handleAssignee = async (staffName: string, taskID: string) => {
    if (!staffNames) return;

    await updateTaskRow(taskID, { assigneeName: staffName });
  };

  const handleDownload = () => {
    const input = pdfRef.current;
    if (!input){
      console.error('pdfRef.current is null')
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('UnassignedTasks.pdf');
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-2">
        <Button
          variant="outlined"
          onClick={() => {
            setCreateTaskDialogOpen(true);
            setTaskRowId(null);
          }}
        >
          Add Task
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          onClick={handleDownload}
        >
          Download
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
      <AssignTask
        open={assignTaskDialogOpen}
        taskID={taskRowId}
        close={() => {
          setTaskFields({ title: "", description: "" });
          setAssignTaskDialogOpen(false);
        }}
      />
      {/* Render tasks in a table */}
      <TableContainer component={Paper} className="smaller-table" ref={pdfRef}>
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
                <TableRow className="cursor-pointer" key={row.id} onClick={() => {
                  router.push(`/tasks/${row.docID}`)
                }}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="assign"
                      color="primary"
                      onClick={() => {
                        setTaskFields({
                          title: row.title,
                          description: row.description,
                        });
                        setTaskRowId(row.docID);
                        setAssignTaskDialogOpen(true);
                      }}
                    >
                      <AssignmentIndIcon />
                    </IconButton>

                    <IconButton
                      aria-label="comment"
                      color="secondary"
                      onClick={() => {
                        setSelectedTaskForComment(row.docID);
                        setCommentDialogOpen(true);
                      }}
                    >
                      {/* Add your comment icon here */}
                      <CommentIcon />
                    </IconButton>
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
      <CommentDialog
        open={commentDialogOpen}
        onClose={() => setCommentDialogOpen(false)}
        onSubmit={(comment) => {
          if (!selectedTaskForComment) return;
          addComment(selectedTaskForComment, comment);
          console.log(`Comment for task ${selectedTaskForComment}: ${comment}`);
          // Clear the selected task after submitting the comment
          setSelectedTaskForComment(null);
        }}
      />
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
  const { staffNames } = useStaff();
  const [assigneeName, setAssigneeName] = useState<string>("");
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(
    initialData ? initialData.description : ""
  );
  const { tasks, updateTaskRow, createTaskRow } = useJobs();
  const actionText = isEditing ? "Update " : "Create ";

  const updateTask = () => {
    if (!taskID) return;
    updateTaskRow(taskID, { title, description, assigneeName: "" });
  };

  const createTask = () => {
    console.log(title, description);
    if (!title && !description && !assigneeName) {
      return;
    }
    createTaskRow(title, description, assigneeName);
    setTitle("");
    setDescription("");
    setAssigneeName("");
    close();
  };

  const options = useMemo(() => {
    if (!staffNames) return [];
    return staffNames.map((s) => {
      return s.name;
    });
  }, [staffNames]);

  const handleClick = () => {
    if (isEditing) return updateTask();
    return createTask();
  };

  useEffect(() => {
    //updates the form fields whenever initialData changes
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>{actionText}Task</DialogTitle>
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
          options={options}
          sx={{ width: 500, length: 50 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Staff" />
          )}
          value={assigneeName}
          onChange={(event, newValue) => {
            if (!newValue) return;
            setAssigneeName(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleClick}>{actionText} Task</Button>
      </DialogActions>
    </Dialog>
  );
}
