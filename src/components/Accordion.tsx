import React, { useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useJobs } from "@/hooks";
import { useRouter } from "next/navigation";

const TableComponent = () => {
  const { assignedJobs } = useJobs();
  const router = useRouter()

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

  return (
    <Paper>
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Title</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">StaffName</Typography>
              </TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>

          {/* Table Rows */}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title} onClick={() => {
                router.push(`/tasks/${row.docID}`)
              }} className="cursor-pointer">
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.assigneeName}</TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
