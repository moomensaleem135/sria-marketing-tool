import { COLORS } from '@/constants/colors';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import ButtonWitnLoading from '../ButtonWithLoading';

interface DeleteModalProps {
  handleClickClearAll: () => void;
  subText: string;
  mainText?: string;
  setIsClearModal: (val: boolean) => void;
  submitBtnText?: string;
}

const DeleteModal = ({
  handleClickClearAll,
  subText,
  setIsClearModal,
  submitBtnText = 'Delete',
  mainText
}: DeleteModalProps) => {
  return (
    <Box textAlign="left">
      <Box sx={{ marginTop: '1rem' }}>
        <Typography>{mainText}</Typography>
        <Typography>{subText}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', columnGap: '0.5rem', marginTop: '1rem' }}>
        <ButtonWitnLoading
          text="Cancel"
          handleClick={() => setIsClearModal(false)}
          bg="white"
          textColor={COLORS.BLUE_600}
          border={`1px solid ${COLORS.BLUE_600}`}
        />
        <ButtonWitnLoading text={submitBtnText} handleClick={handleClickClearAll} />
      </Box>
    </Box>
  );
};

export default DeleteModal;
