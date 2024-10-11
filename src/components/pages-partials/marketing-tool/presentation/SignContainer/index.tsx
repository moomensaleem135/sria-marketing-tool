import React, { useState } from 'react';

import Button from '@/components/core/Button';

import {
  ButtonLeftRow,
  Container,
  SignContainerText,
  SignContainerTextBold
} from '../index.styles';
import CustomModal from '@/components/core/Modal';
import SignModal from '@/components/core/Modal/SignModal';
import ReviewReport from '../ReviewReport';

const SignContainer: React.FC = () => {
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openReportReview, setOpenReportReview] = useState(false);

  const handleApproveSignature = () => {
    setOpenSignModal(false);
    setOpenReportReview(true);
  };

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
        <Button isTransparent onClick={() => setOpenSignModal(true)}>
          Sign & Approve
        </Button>
      </ButtonLeftRow>
      <CustomModal
        openValue={openSignModal}
        closeFunction={() => setOpenSignModal(false)}
        mainHeading="ADOPT SIGNATURE AND SUBMIT"
        modalWidth={'700px'}
      >
        <SignModal
          closeFunction={() => setOpenSignModal(false)}
          handleApprove={handleApproveSignature}
        />
      </CustomModal>
      <CustomModal
        openValue={openReportReview}
        closeFunction={() => setOpenReportReview(false)}
        mainHeading=""
        modalWidth={'700px'}
      >
        <ReviewReport />
      </CustomModal>
    </Container>
  );
};

export default SignContainer;
