'use client';
import { Box, Modal, useMediaQuery, Backdrop } from '@mui/material';
import closeIcon from '@/assets/images/svgs/icons/closeIcon (2).svg';
import Image from 'next/image';
import React from 'react';
// import closeIcon from '../../../assets/images/svgs/icons/closeIcon.svg';
import { CloseButton, MainHeadingTypo } from './index.styles';

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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '75%' : modalWidth,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: padding,
    pt: isSmallLaptop ? 3 : 4,
    zIndex: 10
  };

  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)'
  };

  return (
    <>
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
        <>
          <Box sx={{ ...style }}>
            {closedIcon && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <MainHeadingTypo>{mainHeading}</MainHeadingTypo>
                <CloseButton onClick={closeFunction}>
                  <Image src={closeIcon} alt="close" height={15} width={15} />
                </CloseButton>
              </Box>
            )}
            {children}
          </Box>
        </>
      </Modal>
    </>
  );
};

export default CustomModal;
