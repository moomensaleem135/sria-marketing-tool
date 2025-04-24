'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { Box } from '@mui/material';
import InitialForm from '../initialForm';
import { Answer } from '@/store/app/types';
import { useFormik } from 'formik';

import { questions } from '../websites';
import QuestionSection from '../performance-advertising/QuestionSection';

const fieldData = [
  {
    id: 1,
    name: 'video_title',
    fieldTitle: 'Title of Video:',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 2,
    name: 'advisor',
    fieldTitle: 'Advisor(s)',
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
    name: 'audience',
    fieldTitle: 'Intended Auidence:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 5,
    name: 'video_url',
    fieldTitle: 'Video URL',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 6,
    name: 'upload',
    fieldTitle: 'Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):',
    type: 'upload',
    isFileUpload: true,
    columnSize: 12
  }
];

export default function PartialVideo() {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const formik = useFormik({
    initialValues: {
      video_title: '',
      advisor: '',
      date: '',
      audience: '',
      video_url: '',

      upload: ''
    },
    onSubmit: (values) => {
      if (
        values.video_title !== '' &&
        values.advisor !== '' &&
        values.date !== '' &&
        values.audience !== '' &&
        values.video_url !== '' &&
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
      <TopHeading>Videos</TopHeading>
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
            answers={answers}
            setAnswers={setAnswers}
            fieldData={fieldData}
            formik={formik}
          />
        </Box>
      )}
    </Box>
  );
}
