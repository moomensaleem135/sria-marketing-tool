import React, { useState } from 'react';

import Button from '@/components/core/Button';

import { ButtonLeftRow, SignContainerText, SignContainerTextBold } from '../index.styles';
import CustomModal from '@/components/core/Modal';
import SignModal from '@/components/core/Modal/SignModal';
import ReviewReport from './ReviewReport';
import RecordKeepingModal from './RecordKeepingModal';
import { Container } from '../../blogs-article/index.styles';
import { IQuestionReportContainer } from '@/store/app/types';

const SignContainer = ({ answers, questions, fieldData, formik }: IQuestionReportContainer) => {
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openReportReview, setOpenReportReview] = useState(false);
  const [isRecordKeepModal, setIsRecordKeepModal] = useState<boolean>(false);
  const [signatureText, setSignatureText] = useState<string>('');

  const handleApproveSignature = () => {
    setOpenSignModal(false);
    setOpenReportReview(true);
  };
  console.log('answer', answers, 'fieldData', fieldData);

  return (
    <Container>
      <SignContainerText>
        According to your answers you’ve met the SEC requirements for publishing an advertisement.
      </SignContainerText>
      <SignContainerText>
        Sign below to acknowledge that you’ve answered all questions truthfully and that you have
        reviewed and are following all{' '}
        <SignContainerTextBold onClick={() => setIsRecordKeepModal(true)}>
          recordkeeping requirements
        </SignContainerTextBold>
        .
      </SignContainerText>
      <SignContainerText>Once signed, you can publish your advertising.</SignContainerText>
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
          setSignatureText={setSignatureText}
          signatureText={signatureText}
        />
      </CustomModal>
      <CustomModal
        openValue={openReportReview}
        closeFunction={() => setOpenReportReview(false)}
        mainHeading=""
        modalWidth={'800px'}
      >
        <ReviewReport
          answers={answers}
          questions={questions}
          fieldData={fieldData}
          formik={formik}
          signatureText={signatureText}
        />
      </CustomModal>
      <CustomModal
        openValue={isRecordKeepModal}
        closeFunction={() => setIsRecordKeepModal(false)}
        mainHeading=""
        modalWidth={'700px'}
      >
        <RecordKeepingModal setIsRecordKeepModal={setIsRecordKeepModal} />
      </CustomModal>
      {/* <ReviewReport  /> */}
    </Container>
  );
};

export default SignContainer;
