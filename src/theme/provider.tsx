'use client';
import React from 'react';

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

import theme from './index'
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from './index.styles';

export function MuiThemeProvider({children}: {children: React.ReactNode}) {
    return <ThemeProvider theme={theme} > <CssBaseline /> 
    <StyledToastContainer
        position="top-right"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
  />
  {children}</ThemeProvider>
}