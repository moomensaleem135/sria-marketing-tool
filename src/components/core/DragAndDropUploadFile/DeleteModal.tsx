import { COLORS } from '@/constants/colors';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface DeleteModalProps {
  handleClickClearAll: () => void;
  subText: string;
  setIsClearModal: (val: boolean) => void;
  submitBtnText?: string;
}

const DeleteModal = ({
  handleClickClearAll,
  subText,
  setIsClearModal,
  submitBtnText = 'Delete'
}: DeleteModalProps) => {
  return (
    <Box textAlign="center">
      <Typography variant="body1" gutterBottom>
        {subText}
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleClickClearAll}
          sx={{
            marginRight: 2,
            background: COLORS.BLUE_600,
            '&:hover': {
              background: COLORS.BLUE_600
            }
          }}
        >
          {submitBtnText}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setIsClearModal(false)}
          sx={{
            borderColor: COLORS.BLUE_600,
            color: COLORS.BLUE_600,
            '&:hover': {
              borderColor: COLORS.BLUE_600,
              backgroundColor: 'transparent',
              color: COLORS.BLUE_600
            }
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteModal;
