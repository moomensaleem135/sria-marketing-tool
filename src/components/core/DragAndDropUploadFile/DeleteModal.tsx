import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface DeleteModalProps {
  handleClickClearAll: () => void;
  mainText: string;
  subText: string;
  setIsClearModal: (val: boolean) => void;
  submitBtnText?: string;
}

const DeleteModal = ({
  handleClickClearAll,
  mainText,
  subText,
  setIsClearModal,
  submitBtnText = 'Delete'
}: DeleteModalProps) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" gutterBottom>
        {mainText}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {subText}
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickClearAll}
          sx={{ marginRight: 2 }}
        >
          {submitBtnText}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setIsClearModal(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteModal;
