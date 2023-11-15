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
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon

import React, { useEffect, useMemo, useState } from "react";
import { useGetManagers, useManager } from "@/hooks";
import { doc } from "firebase/firestore";

export default function ManagerTable() {
  const {
    deleteManagerRow,
    managerFields,
    managerRowId,
    setManagerFields,
    setManagerRowId,
    updateManagerRow,
  } = useManager();
  const [createManagerDialogOpen, setCreateManagerDialogOpen] = useState(false);
  const [editManagerData, setEditManagerData] = useState(null); // State to store data of manager being edited
  const { managers, loading } = useGetManagers();

  const rows = useMemo(() => {
    if (!managers?.docs.length) return [];

    return managers.docs.map((doc) => {
      const manager = doc.data();
      return {
        id: manager.managerID,
        managerDepartment: manager.managerDepartment,
        managerName: manager.managerName,
        docID: doc.id
      };
    });
  }, [managers]);
  console.log(rows);

  function setSelectedManager(row: {
    id: any;
    managerDepartment: any;
    managerName: any;
  }) {
    throw new Error("Function not implemented.");
  }

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
                      aria-label="edit"
                      color="primary"
                      onClick={() => {
                        setManagerFields({
                          managerDepartment: row.managerDepartment,
                          managerName: row.managerName,
                        }),
                          setManagerRowId(row.docID); // Set data of manager being edited
                        setCreateManagerDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => deleteManagerRow(row.docID)}
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
        isEditing={Boolean(managerRowId)}
        managerID={managerRowId}
        close={() => {
          setManagerFields({ managerName: "", managerDepartment: "" }); // Reset the editManagerData state when dialog is closed
          setCreateManagerDialogOpen(false);
        }}
        initialData={managerFields} // Pass the data of manager being edited to the CreateManager component
      />
    </>
  );
}
function CreateManager({
  open,
  close,
  initialData,
  isEditing,
  managerID,
}: {
  open: boolean;
  close: () => void;
  initialData: any;
  isEditing: boolean;
  managerID: string | null;
}) {
  const [managerName, setManagerName] = useState(
    initialData ? initialData.managerName : ""
  );
  const [managerDepartment, setManagerDepartment] = useState(
    initialData ? initialData.managerDepartment : ""
  );
  const { Manager, updateManagerRow } = useManager();

  const buttonText = isEditing ? "Update manager" : "Create manager";
  useEffect(() => {
    //updates the form fields whenever initialData changes
    if (initialData) {
      setManagerName(initialData.managerName);
      setManagerDepartment(initialData.managerDepartment);
    }
  }, [initialData]);
  const updateManager = () => {
    if (!managerID) return;
    updateManagerRow(managerID, { managerName, managerDepartment });
  };
  const createManager = () => {
    if (!managerName && !managerDepartment) {
      return;
    }
    Manager.create(managerName, managerDepartment);
    setManagerName("");
    setManagerDepartment("");
  };
  const handleClick = () => {
    
    if (isEditing) return updateManager();
    return createManager();
  };
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>Edit Manager</DialogTitle>
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
        <Button onClick={handleClick}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
}
