import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

interface ModalBoxProps {
  modalWidth: string | number;
  isSmallLaptop: boolean;
  isMobile: boolean;
  padding: number;
}

export const ModalBox = styled(Box)<ModalBoxProps>(
  ({ modalWidth, isSmallLaptop, isMobile, padding }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '75%' : modalWidth,
    maxHeight: '90vh',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '24px',
    padding: `${padding * 8}px`, // converts padding to px
    paddingTop: `${isSmallLaptop ? 24 : 32}px`, // 24px = 3, 32px = 4
    zIndex: 10,
    overflowY: 'auto', // Enable vertical scrolling if content overflows

    /* Custom Scrollbar Styles */
    '::-webkit-scrollbar': {
      width: '5px' // Slim scrollbar
    },
    '::-webkit-scrollbar-track': {
      background: COLORS.BACKGROUND_COLOR // Track color
    },
    '::-webkit-scrollbar-thumb': {
      background: COLORS.BLUE_600, // Blue color for scrollbar thumb
      borderRadius: '10px' // Rounded edges
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#0056b3' // Darker blue on hover
    }
  })
);

export const CloseButton = styled(Button)`
  cursor: pointer;
  height: 2rem;
  min-width: 0px !important;
`;
export const MainHeadingTypo = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${COLORS.BLUE_TEXT};
`;

export const ScrollableBox = styled(Box)`
  max-height: 80vh;
  overflow-y: auto;

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 5px; /* Slim scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.BACKGROUND_COLOR}; /* Track color */
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.BLUE_600}; /* Blue color for scrollbar thumb */
    border-radius: 10px; /* Rounded edges */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0056b3; /* Darker blue on hover */
  }
`;
