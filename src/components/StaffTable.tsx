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
import React, { useEffect, useMemo, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Material-UI Edit icon
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Material-UI Download icon
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const pdfRef = useRef(null);

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
      pdf.save('Staffs.pdf');
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-2">
        <Button
          variant="outlined"
          onClick={() => {
            setCreateStaffDialogOpen(true);
            setStaffRowId(null);
          }}
        >
          New Staff
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>

        <TableContainer component={Paper} className="smaller-table" ref={pdfRef}>
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

  const actionText = isEditing ? "Update " : "Create ";

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
      <DialogTitle>{actionText}New Staff</DialogTitle>
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
        <Button onClick={handleClick}>{actionText}New Staff</Button>
      </DialogActions>
    </Dialog>
  );
}
