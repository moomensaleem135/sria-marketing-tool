'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import InitialForm from '../initialForm';
import { useFormik } from 'formik';
import { Answer } from '@/store/app/types';
import { Box } from '@mui/material';
import { questions } from '../websites';
import QuestionSection from '../performance-advertising/QuestionSection';

const fieldData = [
  {
    id: 1,
    name: 'blog_title',
    fieldTitle: 'Blog or Article Title:',
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
    name: 'URL',
    fieldTitle: 'URL of Content:',
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

const PartialBlogArticle = () => {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);
  const [blogAnswers, setBlogAnswers] = useState<Answer[]>([]);

  // Get toggle states from Redux store
  const { isAdd, isQuestionsContainerOpen, isSignContainerOpen } = useSelector(
    (state: any) => state.marketingTools.blog
  );
  console.log(isAdd, isQuestionsContainerOpen, isSignContainerOpen);

  const formik = useFormik({
    initialValues: {
      blog_title: '',
      advisor: '',
      date: '',
      URL: '',
      upload: ''
    },
    onSubmit: (values) => {
      if (
        values.blog_title !== '' &&
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
      <TopHeading>Blogs or Articles</TopHeading>
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
            answers={blogAnswers}
            setAnswers={setBlogAnswers}
            fieldData={fieldData}
            formik={formik}
          />
        </Box>
      )}
    </Box>
  );
};
export default PartialBlogArticle;
