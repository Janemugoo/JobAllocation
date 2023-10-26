'use client'
import { useStaff } from '@/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';


export default function Page() {
    const [createEmployeeDialogOpen, setCreateEmployeeDialogOpen] = useState(false);
   // const [createManagerDialogOpen, setCreateManagerDialogOpen] = useState
  return (
    <><div>
      <Button
        variant="outlined"
        onClick={() => {
          setCreateEmployeeDialogOpen(true);
        } }
      >
        New Staff
      </Button>
    </div><CreateStaff open={createEmployeeDialogOpen} close={()=>setCreateEmployeeDialogOpen(false) }/></>
  )
}
function CreateStaff({ open, close }: { open: boolean; close: () => void }) {
  const [staffName, setStaffName] = useState("");
  const [staffDepartment, setStaffDepartment] = useState("");
  const {Staff} = useStaff()
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
          }}/>
          </DialogContent>
          <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={createEmployee}>Create New Staff</Button>
      </DialogActions>
          </Dialog>
          
  )
}
