import React from 'react';

import Button from '@/components/core/Button';

import {
  ButtonLeftRow,
  Container,
  SignContainerText,
  SignContainerTextBold
} from '../index.styles';

const SignContainer: React.FC = () => {
  return (
    <Container>
      <SignContainerText>
        According to your answers you’ve met the SEC requirements for publishing an advertisement.
      </SignContainerText>
      <SignContainerText>
        Sign below to acknowledge that you’ve answered all questions truthfully and that you have
        reviewed and are following all{' '}
        <SignContainerTextBold>recordkeeping requirements</SignContainerTextBold>.
      </SignContainerText>
      <SignContainerText>
        Once signed, you can{' '}
        <SignContainerTextBold>publish your advertising.</SignContainerTextBold>
      </SignContainerText>
      <ButtonLeftRow>
        <Button isTransparent>Sign & Approve</Button>
      </ButtonLeftRow>
    </Container>
  );
};

export default SignContainer;
