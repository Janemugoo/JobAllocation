import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export default function AssignedTable() {
  const tasks: any[] = []; // Define your tasks array here

  return (
    <TableContainer component={Paper} className="smaller-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Title</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Staff Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
