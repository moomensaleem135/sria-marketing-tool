'use client';
import { COLORS } from '@/constants/colors';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    // <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:'85dvh' }}>
    <Box
      sx={{
        height: '85dvh',
        width: '100%',
        backgroundColor: COLORS.GREY_2,
        backdropFilter: 'blur(10px)', // Moved blur to backdropFilter
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden' // Prevent scrollbars,
      }}
    >
      <Box className="animate-zoom ">
        <Image src="/svgs/lpcLogo.svg" alt="logo" height={180} width={210} />
      </Box>
    </Box>
    // </Box>
  );
};

export default Loading;
