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
import React, { useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon

export default function StaffTable() {
  const {
    deleteStaffRow,
    staffFields,
    staffRowId,
    setStaffFields,
    setStaffRowId,
    updateStaffRow,
  } = useStaff();
  const [createStaffDialogOpen, setCreateStaffDialogOpen] = useState(false); //change to staff
  const { staffs, loading } = useGetStaffs();

  const rows = useMemo(() => {
    if (!staffs?.docs.length) return [];

    return staffs.docs.map((doc) => {
      const staff = doc.data();
      return {
        id: staff.staffID,
        staffDepartment: staff.staffDepartment,
        staffName: staff.staffName,
        docID:doc.id
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
                        setStaffFields({
                          staffDepartment: row.staffDepartment,
                          staffName: row.staffName,
                        }),
                          setStaffRowId(row.docID);
                        setCreateStaffDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => deleteStaffRow(row.docID)}
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
        isEditing={Boolean(staffRowId)}
        staffID={staffRowId}
        close={() => {
          setStaffFields({ staffName: "", staffDepartment: "" }); // Reset the editStaffData state when dialog is closed
          setCreateStaffDialogOpen(false);
        }}
        initialData={staffFields}
      />
    </>
  );
}
function CreateStaff({
  open,
  close,
  initialData,
  isEditing,
  staffID
}: {

  open: boolean;
  close: () => void;
  initialData: any;
  isEditing: boolean;
  staffID: string | null;
}) {
  const [staffName, setStaffName] = useState(
    initialData ? initialData.staffName : ""
  );
  const [staffDepartment, setStaffDepartment] = useState(
    initialData ? initialData.staffDepartment : ""
  );
  const { Staff, updateStaffRow, } = useStaff();

  useEffect(() => {
    //updates the form fields whenever initialData changes
    if (initialData) {
      setStaffName(initialData.staffName);
      setStaffDepartment(initialData.staffDepartment);
    }
  }, [initialData]);
  const updateStaff = () => {
    if (!staffID) return;
    updateStaffRow(staffID, { staffName, staffDepartment });
  };
  const createEmployee = () => {
    console.log(staffName, staffDepartment);
    if (!staffName && !staffDepartment) {
      return;
    }
    Staff.create(staffName, staffDepartment);
    setStaffName("");
    setStaffDepartment("");
  
  };
  const handleClick = () => {
    
    if (isEditing) return updateStaff();
    return createEmployee();
  };
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>Edit Staff</DialogTitle>
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
        <Button onClick={handleClick}>Edit Staff</Button>
      </DialogActions>
    </Dialog>
  );
}
