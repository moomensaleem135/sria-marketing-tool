'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import InitialForm from '../initialForm';
import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import QuestionSection from '../performance-advertising/QuestionSection';

const fieldData = [
  {
    id: 1,
    name: 'campaign_name',
    fieldTitle: 'Email Campaign / Newsletter Name:',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 2,
    name: 'advisor',
    fieldTitle: 'Advisor(s):',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 3,
    name: 'date',
    fieldTitle: 'Review Date:',
    type: 'date',
    isFileUpload: false,
    columnSize: 2
  },
  {
    id: 4,
    name: 'URL',
    fieldTitle: 'Intended Audience:',
    type: 'text',
    isFileUpload: false,
    columnSize: 12
  },
  {
    id: 5,
    name: 'upload',
    fieldTitle: 'Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):',
    type: 'upload',
    isFileUpload: true,
    columnSize: 12
  }
];
export default function PartialEmailsCampaings() {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);
  const [emailCampaingsAnswers, setEmailCampaingsAnwers] = useState<Answer[]>([]);

  const formik = useFormik({
    initialValues: {
      campaign_name: '',
      advisor: '',
      date: '',
      URL: '',
      upload: ''
    },
    onSubmit: (values) => {
      if (
        values.campaign_name !== '' &&
        values.advisor !== '' &&
        values.date !== '' &&
        values.URL !== '' &&
        values.upload !== ''
      ) {
        setIsBeginReview(true);
      } else {
        setIsAllFieldModal(true);
      }
    }
  });

  return (
    <Box>
      <TopHeading>Email Campaigns or Newsletters</TopHeading>

      <InitialForm
        fieldsData={fieldData}
        formik={formik}
        isAllFieldModal={isAllFieldModal}
        setIsAllFieldModal={setIsAllFieldModal}
      />
      {isBeginReview && (
        <Box sx={{ marginTop: '1rem' }}>
          <QuestionSection
            questions={questions}
            answers={emailCampaingsAnswers}
            setAnswers={setEmailCampaingsAnwers}
            fieldData={fieldData}
            formik={formik}
          />
        </Box>
      )}
    </Box>
  );
}
