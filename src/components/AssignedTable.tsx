import { useJobs } from "@/hooks";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { title } from "process";
import React, { useMemo } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Material-UI Download icon

export default function AssignedTable() {
  const tasks: any[] = []; // Define your tasks array here
  const { assignedJobs } = useJobs();
  const rows = useMemo(() => {
    if (!assignedJobs?.docs.length) return [];
    return assignedJobs.docs.map((doc) => {
      const assignedJob = doc.data();
      return {
        title: assignedJob.title,
        description: assignedJob.description,
        assigneeName: assignedJob.assigneeName,
        docID: doc.id,
      };
    });
  }, [assignedJobs]);

  const handleDownload = () => {
    // Implement your download logic here
    console.log("Download clicked");
  };

  return (
    <>
    <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>

    <TableContainer component={Paper} className="smaller-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Title</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Staff Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((task) => (
            <TableRow key={task.docID}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.assigneeName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
