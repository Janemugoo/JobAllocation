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
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Material-UI Download icon
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGetManagers, useManager } from "@/hooks";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  const pdfRef = useRef(null);

  const rows = useMemo(() => {
    if (!managers?.docs.length) return [];

    return managers.docs.map((doc) => {
      const manager = doc.data();
      return {
        id: manager.managerID,
        managerDepartment: manager.managerDepartment,
        managerName: manager.managerName,
        docID: doc.id,
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
      pdf.save('Managers.pdf');
    });
  };
  return (
    <>
      <div className="w-full flex flex-col items-start gap-2"  >
        <Button
          variant="outlined"
          onClick={() => {
            setCreateManagerDialogOpen(true);
            setManagerRowId(null);
          }}
        >
          New Manager
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>

        {/* Table component */}
        <TableContainer component={Card} className="table-fixed" ref={pdfRef}>
          <Table >
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

  const actionText = isEditing ? "Update " : "Create ";

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
      <DialogTitle>{actionText} Manager</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form below to {buttonText} a Manager.
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
        <Button onClick={handleClick}>{actionText}</Button>
      </DialogActions>
    </Dialog>
  );
}
