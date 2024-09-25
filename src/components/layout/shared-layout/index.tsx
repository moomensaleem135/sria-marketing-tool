'use client';
// import useFetchTasks from '@/hooks/useFetchtask';
import { useAppSelector } from '@/hooks/useReduxTypedHooks';
import { getAuthDataSelector } from '@/store/auth';
import { Container } from '@mui/material';
import React, { ReactNode } from 'react';

import LeftDrawer from '../sidebar';

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout = ({ children }: SharedLayoutProps) => {

  // useFetchTasks();

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <LeftDrawer children={children} pageTitle="home" />
    </Container>
  );
};

export default SharedLayout;
