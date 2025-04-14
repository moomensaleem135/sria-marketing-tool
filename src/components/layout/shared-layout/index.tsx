'use client';

import { useAppSelector } from '@/hooks/useReduxTypedHooks';
import { getAuthDataSelector } from '@/store/auth';
import { Container } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import LeftDrawer from '../sidebar';

interface SharedLayoutProps {
  children: ReactNode;
}
const LANDING_PAGE = '/';
const SharedLayout = ({ children }: SharedLayoutProps) => {
  const { isAuthenticated } = useAppSelector(getAuthDataSelector);

  const currentRoute = usePathname();

  return (
    <Container maxWidth={false} style={{ padding: 0, zIndex: '-1111' }}>
      {/* {isAuthenticated && !currentRoute.includes('/login')  ? ( */}
      <LeftDrawer children={children} pageTitle="home" />
      {/* ) : (
        children
      )} */}
    </Container>
  );
};

export default SharedLayout;
