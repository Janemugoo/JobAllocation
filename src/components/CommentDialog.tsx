import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

export default function CommentDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}) {
  const [comment, setComment] = useState('');

  const handleClose = () => {
    setComment(''); // Reset comment on close
    onClose();
  };

  const handleCommentSubmit = () => {
    onSubmit(comment);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Comment"
          type="text"
          fullWidth
          variant="standard"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCommentSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
