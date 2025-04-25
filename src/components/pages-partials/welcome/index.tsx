'use client';
import React from 'react';

import {
  Btn,
  DivButton,
  FooterContainer,
  Heading,
  ImageDiv,
  LogoBox,
  MainContainer,
  Nav,
  SubHeading,
  TextDiv
} from './index.styles';

import Button from '@/components/core/Button';

import Image from 'next/image';

import { useRouter } from 'nextjs-toploader/app';

const Welcome = () => {
  const router = useRouter();

  return (
    <MainContainer>
      <Nav>
        <LogoBox>
          <Image src="/svgs/Wordmark.svg" width={150} height={50} alt="" />
        </LogoBox>
        <DivButton>
          <Button onClick={() => router.push('/login')}>Login</Button>
        </DivButton>
      </Nav>
      <ImageDiv>
        <TextDiv>
          <Heading>- Modern Compliance Software -</Heading>
          <SubHeading>
            DESIGNED FOR <br /> Investment Advisory Firms <br /> Eliminate the Guesswork - Protect
            What You’ve Built
          </SubHeading>
        </TextDiv>
        <Btn>
          <Button>Schedule Demo</Button>
        </Btn>
      </ImageDiv>
      <FooterContainer />
    </MainContainer>
  );
};

export default Welcome;
