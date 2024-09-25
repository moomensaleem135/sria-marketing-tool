'use client';
import Image from 'next/image';

import { CircularProgress } from '@mui/material';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { getAuthDataSelector, clearError, signIn } from '@/store/auth';

import { loginValidation } from '@/validations/index';

import React, { useEffect } from 'react';

import { toast } from 'react-toastify';
import Button from '@/components/core/Button';
import FieldInput from '@/components/core/FieldInput';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxTypedHooks';


import {
  StyledGridRight,
  Heading,
  FlexRow,
  DivButton,
  Container,
  DivSpace,
  SubHeading,
  LogoBox
} from './index.styles';

export interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();

  const { status, error, isAuthenticated } = useAppSelector(getAuthDataSelector);

  const onFormSubmit = async (values: FormValues) => {
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (error && error.length > 0) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  // if (isAuthenticated === true && !isNavigated) {
  //   router.push("/home");
  // }

  return (
    <Container container>
      <StyledGridRight item md={4} xs={10}>
        <LogoBox>
          <Image src="/svgs/Wordmark.svg" height={100} width={250} alt="" />
        </LogoBox>
        <SubHeading>Compilance DashBoard</SubHeading>
        <Heading>Secure Login</Heading>
        <DivSpace />
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={() => loginValidation}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, isValid, dirty }) => {
            return (
              <Form className="login-form">
                <Field
                  as={FieldInput}
                  id="email"
                  name="email"
                  placeholder="User ID"
                  error={errors.email && touched.email ? true : false}
                  helperText={<ErrorMessage name="email" />}
                />
                <DivSpace />
                <Field
                  as={FieldInput}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password  "
                  error={errors.password && touched.password ? true : false}
                  helperText={<ErrorMessage name="password" className="color-white" />}
                />
                <FlexRow>
                  <p>Forgot Your Password ?</p>
                </FlexRow>
                <DivButton>
                  <Button disabled={!(dirty && isValid)} type="submit">
                    {status === 'pending' ? <CircularProgress /> : 'Sign In'}
                  </Button>
                </DivButton>
              </Form>
            );
          }}
        </Formik>
      </StyledGridRight>
    </Container>
  );
}
