import React, { useMemo } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useJobs } from "@/hooks";

const TableComponent = () => {
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
  return (
    <Paper>
      <List>
        {/* Table Header */}
        <ListItem>
          <ListItemText>
            <Typography variant="subtitle1">Title</Typography>
          </ListItemText>
          <ListItemText>
            <Typography variant="subtitle1">Description</Typography>
          </ListItemText>
          <ListItemText>
            <Typography variant="subtitle1">StaffName</Typography>
          </ListItemText>
          {/* Add more columns as needed */}
        </ListItem>

        {/* Table Rows */}
        {rows.map((row) => (
          <ListItem key={row.title}>
            <ListItemText >{row.title}</ListItemText>
            <ListItemText>{row.description}</ListItemText>
            <ListItemText>{row.assigneeName}</ListItemText>
            {/* Add more columns as needed */}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TableComponent;
