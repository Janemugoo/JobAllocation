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
import React, { useMemo, useState } from "react";
import { useGetManagers, useManager } from "@/hooks";

export default function ManagerTable() {
  const [createManagerDialogOpen, setCreateManagerDialogOpen] = useState(false);
  const { managers, loading } = useGetManagers();
  console.log(managers?.docs);
  const rows = useMemo(() => {
    if (!managers?.docs.length) return [];

    return managers.docs.map((doc) => {
      const manager = doc.data();
      return {
        id: manager.id,
        managerDepartment: manager.managerDepartment,
        managerName: manager.managerName,
      };
    });
  }, [managers]);
  console.log(rows);

  return (
    <>
      <div className="w-full flex flex-col items-start gap-2">
        <Button
          variant="outlined"
          onClick={() => {
            setCreateManagerDialogOpen(true);
          }}
        >
          New Manager
        </Button>

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
                    {row.managerName}
                  </TableCell>
                  <TableCell align="right">{row.managerDepartment}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
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
      <CreateManager
        open={createManagerDialogOpen}
        close={() => setCreateManagerDialogOpen(false)}
      />
    </>
  );
}
function CreateManager({ open, close }: { open: boolean; close: () => void }) {
  const [managerName, setManagerName] = useState("");
  const [managerDepartment, setManagerDepartment] = useState("");
  const { Manager } = useManager();
  const createManager = () => {
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
