import { Box, Modal, useMediaQuery, Backdrop } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CloseButton, MainHeadingTypo, ModalBox } from './index.styles';

export interface IModal {
  openValue: boolean;
  closeFunction: () => void;
  children: React.ReactNode;
  closedIcon?: boolean;
  modalWidth?: string | number;
  mainHeading?: string;
  padding?: number;
}

const CustomModal = ({
  openValue,
  closeFunction,
  children,
  closedIcon = true,
  modalWidth = 500,
  mainHeading = '',
  padding = 4
}: IModal) => {
  const isSmallLaptop = useMediaQuery(' (max-height:800px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: isMobile ? '75%' : modalWidth,
  //   maxHeight: '90vh',
  //   bgcolor: 'background.paper',
  //   borderRadius: '10px',
  //   boxShadow: 24,
  //   p: padding,
  //   pt: isSmallLaptop ? 3 : 4,
  //   zIndex: 10
  // };

  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)'
  };

  return (
    <Modal
      open={openValue}
      onClose={closeFunction}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: backdropStyle
      }}
    >
      <ModalBox
        modalWidth={modalWidth}
        isSmallLaptop={isSmallLaptop}
        isMobile={isMobile}
        padding={padding}
      >
        {closedIcon && (
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <MainHeadingTypo>{mainHeading}</MainHeadingTypo>
            <CloseButton onClick={closeFunction}>
              <CloseIcon
                sx={{
                  height: '25px',
                  width: '25px',
                  color: '#2E3338'
                }}
              />
            </CloseButton>
          </Box>
        )}
        <Box sx={{ maxHeight: '80vh' }}>{children}</Box>
      </ModalBox>
    </Modal>
  );
};

export default CustomModal;
