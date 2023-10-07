"use client";
import {
  AccordionSummary,
  Typography,
  AccordionDetails,
  Accordion,
  Box,
  Checkbox,
  AccordionActions,
  Button,
} from "@mui/material";
import React from "react";

export default function TaskPanel() {
  const [expanded, setExpanded] = React.useState<string | false>();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Accordion
      className="bg-gray-50 "
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      elevation={1}
    >
      <AccordionSummary
        className="bg-white"
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography>Week1 Tasks </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {[1, 2, 3, 4].map((number) => {
          return <TaskItem task={{ number }} key={number} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
}
function TaskItem({ task }: { task: { [key: string]: any } }) {
  return (
    <Box className="flex items-center my-4 gap-2">
      <Checkbox /> <Typography>Fix LAN Cables in the HRs Office </Typography>
    </Box>
  );
}
