import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
  Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Material Icons delete icon
import React, { useState } from "react";
import { useManager } from "@/hooks";

export default function ManagerTable() {
  const [createManagerDialogOpen, setCreateManagerDialogOpen] = useState(false);

  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", department: "IT", managerId: "12345" },
    { id: 2, name: "Jane Smith", department: "HR", managerId: "67890" },
    // Add more rows if needed
  ]);

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div>
      <div className="fixed right-2">
        <Button
          variant="outlined"
          onClick={() => {
            setCreateManagerDialogOpen(true);
          }}
        >
          New Manager
        </Button>
      </div>
      <CreateManager
        open={createManagerDialogOpen}
        close={() => setCreateManagerDialogOpen(false)}
      />

      {/* Table component */}
      <TableContainer component={Card} className="table-fixed">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Manager ID</TableCell>
              <TableCell align="right">Actions</TableCell>{" "}
              {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.managerId}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
function CreateManager({ open, close }: { open: boolean; close: () => void }) {
  const [managerName, setManagerName] = useState("");
  const [managerDepartment, setManagerDepartment] = useState("");
  const { Manager } = useManager();
  const createManager = () => {
    console.log(managerName, managerDepartment);
    if (!managerName && !managerDepartment) {
      return;
    }
    Manager.create(managerName, managerDepartment);
    setManagerName("");
    setManagerDepartment("");
  };
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>Create New Manager</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form below to create a new Manager.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Manager Name"
          type="text"
          fullWidth
          variant="standard"
          value={managerName}
          onChange={(event) => {
            setManagerName(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Manager Department"
          type="text"
          fullWidth
          variant="standard"
          value={managerDepartment}
          onChange={(event) => {
            setManagerDepartment(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createManager}>Create New Manager</Button>
      </DialogActions>
    </Dialog>
  );
}
