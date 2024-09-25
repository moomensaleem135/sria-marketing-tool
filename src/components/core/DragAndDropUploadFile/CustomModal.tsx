import { Dialog, DialogContent } from '@mui/material';
import React from 'react';

interface CustomModalProps {
  value: boolean;
  setValue: (val: boolean) => void;
  maxWidth?: string;
  children: React.ReactNode;
}

const CustomModal = ({ value, setValue, maxWidth = '30rem', children }: CustomModalProps) => {
  return (
    <Dialog
      open={value}
      onClose={() => setValue(false)}
      PaperProps={{
        style: { maxWidth: maxWidth, width: '100%' }
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomModal;
