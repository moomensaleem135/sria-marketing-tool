'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAdd,
  toggleQuestionsContainer,
  toggleSignContainer
} from '@/store/marketingTools/componentSlices/blogSlice';

import InitialForm from '../initialForm';
import { useFormik } from 'formik';
import { AnswerData } from '@/store/app/types';
import { Box } from '@mui/material';
import QuestionSection from '../websites/QuestionSection';
import { questions } from '../websites';

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
  const [blogAnswers, setBlogAnswers] = useState<AnswerData[]>([]);
  const dispatch = useDispatch();

  // Get toggle states from Redux store
  const { isAdd, isQuestionsContainerOpen, isSignContainerOpen } = useSelector(
    (state: any) => state.marketingTools.blog
  );
  console.log(isAdd, isQuestionsContainerOpen, isSignContainerOpen);
  const handleClick = () => {
    dispatch(toggleAdd());
  };

  const handleSubmit = () => {
    dispatch(toggleQuestionsContainer());
  };

  const openSignContainer = () => {
    dispatch(toggleSignContainer());
  };
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
            // openSignContainer={openSignContainer}
            answers={blogAnswers}
            setAnswers={setBlogAnswers}
            // setIsSignInOpen={setIsSignInOpen}
          />
        </Box>
      )}
    </Box>
  );
};
export default PartialBlogArticle;
