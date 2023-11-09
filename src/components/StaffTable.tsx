import { useGetStaffs, useStaff } from "@/hooks";
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
import React, { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon

export default function StaffTable() {
  const [createStaffDialogOpen, setCreateStaffDialogOpen] = useState(false); //change to staff
  const { staffs, loading } = useGetStaffs();
  console.log(staffs?.docs);
  const rows = useMemo(() => {
    if (!staffs?.docs.length) return [];

    return staffs.docs.map((doc) => {
      const staff = doc.data();
      return {
        id: staff.staffID,
        staffDepartment: staff.staffDepartment,
        staffName: staff.staffName,
      };
    });
  }, [staffs]);
  console.log(rows);

  return (
    <>
      <div className="w-full flex flex-col items-start gap-2">
        <Button
          variant="outlined"
          onClick={() => {
            setCreateStaffDialogOpen(true);
          }}
        >
          New Staff
        </Button>

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
                    {row.staffName}
                  </TableCell>
                  <TableCell align="right">{row.staffDepartment}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
                  <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => {
                 // setSelectedStaff(row);
                  setCreateStaffDialogOpen(true);
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
      </div>

      {/* Table component */}

      <CreateStaff
        open={createStaffDialogOpen}
        close={() => setCreateStaffDialogOpen(false)}
      />
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
