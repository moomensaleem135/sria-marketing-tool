'use client';

import { useAppSelector } from '@/hooks/useReduxTypedHooks';
import { getAuthDataSelector } from '@/store/auth';
import { Container } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

import LeftDrawer from '../sidebar';
import Loading from 'src/app/loading';
import { ProcessLoginToken } from '@/services/app/loginTokenProcess';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

interface SharedLayoutProps {
  children: ReactNode;
}
const LANDING_PAGE = '/';
const SharedLayout = ({ children }: SharedLayoutProps) => {
  const { isAuthenticated } = useAppSelector(getAuthDataSelector);
  console.log('isAuthenticated', isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const encToken = params.get('token');

  const loginWithToken = async () => {
    try {
      const resp = await ProcessLoginToken(encToken as string);
      if (resp) {
        Cookies.set('token', resp.data.token);
        Cookies.set('user', JSON.stringify(resp.data.user));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Token login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (encToken) {
      loginWithToken();
    }
  }, [encToken]);

  return !isLoading ? (
    <Container maxWidth={false} style={{ padding: 0, zIndex: '-1111' }}>
      <LeftDrawer children={children} pageTitle="home" />
    </Container>
  ) : (
    <Loading />
  );
};

export default SharedLayout;
