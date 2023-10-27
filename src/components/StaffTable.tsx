import { useStaff } from "@/hooks";
import {
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
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StaffTable() {
  const [createStaffDialogOpen, setCreateStaffDialogOpen] = useState(false); //change to staff
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", department: "IT", managerId: "12345" },
    { id: 2, name: "Jane Smith", department: "HR", managerId: "67890" },
    // Add more rows if needed
  ]);

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  return (
    <>
      {" "}
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            setCreateStaffDialogOpen(true);
          }}
        >
          New Staff
        </Button>
      </div>
      <CreateStaff
        open={createStaffDialogOpen}
        close={() => setCreateStaffDialogOpen(false)}
      />
      {/* Table component */}
      <TableContainer component={Paper} className="smaller-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Staff ID</TableCell>
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
                    <DeleteIcon/>
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
function CreateStaff({ open, close }: { open: boolean; close: () => void }) {
  const [staffName, setStaffName] = useState("");
  const [staffDepartment, setStaffDepartment] = useState("");
  const { Staff } = useStaff();
  const createEmployee = () => {
    console.log(staffName, staffDepartment);
    if (!staffName && !staffDepartment) {
      return;
    }
    Staff.create(staffName, staffDepartment);
    setStaffName("");
    setStaffDepartment("");
  };
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>Create New Staff</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form below to create a new Staff.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Staff Name"
          type="text"
          fullWidth
          variant="standard"
          value={staffName}
          onChange={(event) => {
            setStaffName(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Staff Department"
          type="text"
          fullWidth
          variant="standard"
          value={staffDepartment}
          onChange={(event) => {
            setStaffDepartment(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createEmployee}>Create New Staff</Button>
      </DialogActions>
    </Dialog>
  );
}
