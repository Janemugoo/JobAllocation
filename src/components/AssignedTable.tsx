import { useJobs } from "@/hooks";
import {
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

export default function AssignedTable() {
  const tasks: any[] = []; // Define your tasks array here
  const { unassignedJobs, assignedJobs } = useJobs();
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
  }, []);
  return (
    <TableContainer component={Paper} className="smaller-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Title</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Task ID</TableCell>
            <TableCell>Staff Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.assigneeName}</TableCell>
              <TableCell>{task.Actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
