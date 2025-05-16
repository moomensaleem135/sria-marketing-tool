import React, { useState } from 'react';

import Button from '@/components/core/Button';

import { ButtonLeftRow, SignContainerText, SignContainerTextBold } from '../index.styles';
import CustomModal from '@/components/core/Modal';
import SignModal from '@/components/core/Modal/SignModal';
import ReviewReport from './ReviewReport';
import RecordKeepingModal from './RecordKeepingModal';
import { Container } from '../../blogs-article/index.styles';
import { IQuestionReportContainer } from '@/store/app/types';
import { UploadReportService } from '@/services/app';
import ReviewReportPDF from './ReviewReport/reviewReport';
import { pdf } from '@react-pdf/renderer';
import moment from 'moment';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/useReduxTypedHooks';
import { getAppDataSelector } from '@/store/app';
const SignContainer = ({ answers, questions, fieldData, formik }: IQuestionReportContainer) => {
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openReportReview, setOpenReportReview] = useState(false);
  const [isRecordKeepModal, setIsRecordKeepModal] = useState<boolean>(false);
  const [signatureText, setSignatureText] = useState<string>('');
  const [isReportUploading, setIsReportUploading] = useState<boolean>(false);
  const { tabFiles } = useAppSelector(getAppDataSelector);
  const uploadReport = async () => {
    try {
      const formData = new FormData();
      formData.append('marketing_reviewname', formik.values.title);
      formData.append('advisor_name ', formik.values.advisor);
      formData.append('review_date  ', formik.values.date);
      formData.append('marketing_type_name   ', formik.values.currentTab);

      tabFiles.forEach((item) => {
        if (item.file instanceof File) {
          formData.append('additional_files', item.file);
        }
      });
      const file = await generateAndDownloadPDF({
        answers: answers,
        questions: questions,
        fieldData: fieldData,
        formikValues: formik.values,
        signatureText: signatureText,
        ccoName: 'Brayan'
      });
      if (file) {
        formData.append('report_file_pdf  ', file);
        // if (file) {
        //   // Create a Blob from the binary data with PDF MIME type
        //   const blob = new Blob([file], {
        //     type: 'application/pdf'
        //   });

        //   // Create a URL for the Blob
        //   const url = URL.createObjectURL(blob);

        //   // Create a link and trigger the download
        //   const link = document.createElement('a');
        //   link.href = url;
        //   link.download = 'Marketing-Review-Report.pdf'; // Using PDF extension

        //   document.body.appendChild(link);
        //   link.click();

        //   // Clean up
        //   document.body.removeChild(link);
        //   URL.revokeObjectURL(url);
        // }
        const resp = await UploadReportService(formData);
        if (resp) {
          toast.success('Report uploaded successfuly', {
            style: {
              background: 'green'
            }
          });
          setIsReportUploading(false);

          return resp;
        }
      }
    } catch (error) {
      toast.error(`${error}`);
      setIsReportUploading(false);
    }
  };
  const generateAndDownloadPDF = async ({
    answers,
    questions,
    fieldData,
    formikValues,
    signatureText,
    ccoName
  }: {
    answers: any[];
    questions: any[];
    fieldData: any[];
    formikValues: any;
    signatureText: string;
    ccoName: string;
  }) => {
    try {
      // Create the PDF document
      const doc = (
        <ReviewReportPDF
          answers={answers}
          questions={questions}
          fieldData={fieldData}
          formikValues={formikValues}
          signatureText={signatureText}
          ccoName={ccoName}
        />
      );

      const pdfInstance = pdf(doc);
      const blob = await pdfInstance.toBlob();

      const file = new File(
        [blob],
        `MRT Report (${formik.values.currentTab})_${new Date().getTime()}.pdf`,
        {
          type: blob.type
        }
      );

      return file;
    } catch (error) {
      console.error('Error generating PDF:', error);
      // You might want to show an error message to the user here
    }
  };
  const handleApproveSignature = async () => {
    try {
      setIsReportUploading(true);
      const resp = await uploadReport();
      if (resp) {
        // console.log('resp', resp);
        setOpenSignModal(false);
        setOpenReportReview(true);
      }
    } catch (error) {
      setIsReportUploading(false);
    }
  };

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
          answers={answers}
          isReportUploading={isReportUploading}
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
