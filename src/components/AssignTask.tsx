import { useJobs, useStaff } from "@/hooks";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Autocomplete,
  DialogActions,
  Button,
} from "@mui/material";
import { title } from "process";
import React, { useMemo, useState } from "react";

export function AssignTask({
  open,
  close,
  taskID,
}: {
  open: boolean;
  close: () => void;
  taskID: string | null;
}) {
  const [assigneeName, setAssigneeName] = useState<string>("");

  const { updateTaskRow } = useJobs();
  const { staffNames } = useStaff();
  const updateTask = () => {
    if (!taskID) return;
    updateTaskRow(taskID, { assigneeName});
  };
  const handleClick = () => {
     updateTask();
     return close()
  };
  const options = useMemo(() => {
    if (!staffNames) return []
    return staffNames.map((s) => {
      return s.name;
    });
  }, [staffNames]);
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>Assign Task</DialogTitle>
      <DialogContent>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 500, length: 50 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Staff" />
          )}
          value={assigneeName}
          onChange={(event, newValue) => {
            if (!newValue) return;
            setAssigneeName(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleClick}>Assign Task</Button>
      </DialogActions>
    </Dialog>
  );
}
