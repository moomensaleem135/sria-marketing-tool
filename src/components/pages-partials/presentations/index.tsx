'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';
import InitialForm from '../initialForm';
import { useFormik } from 'formik';
import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import QuestionSection from '../performance-advertising/QuestionSection';

const fieldData = [
  {
    id: 1,
    name: 'presentation_name',
    fieldTitle: 'Name of Presentation:',
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

const PartialPresentation = () => {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);
  const [presentationAnswers, setPresentationAnswers] = useState<Answer[]>([]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      presentation_name: '',
      advisor: '',
      date: '',
      audience: '',
      upload: ''
    },
    onSubmit: (values) => {
      if (
        values.presentation_name !== '' &&
        values.advisor !== '' &&
        values.date !== '' &&
        values.audience !== '' &&
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
      <TopHeading>Presentations</TopHeading>
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
            answers={presentationAnswers}
            setAnswers={setPresentationAnswers}
            fieldData={fieldData}
            formik={formik}
          />
        </Box>
      )}
    </Box>
  );
};
export default PartialPresentation;
