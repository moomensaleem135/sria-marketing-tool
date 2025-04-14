'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAdd,
  toggleQuestionsContainer,
  toggleSignContainer
} from '@/store/marketingTools/componentSlices/socialMediaSlice';

import { Box } from '@mui/material';
import InitialForm from '../initialForm';
import { useFormik } from 'formik';
import { AnswerData } from '@/store/app/types';
import QuestionSection from '../websites/QuestionSection';
import { questions } from '../websites';

const fieldData = [
  {
    id: 1,
    name: 'post_title',
    fieldTitle: 'Tile of Social Media Post:',
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
    name: 'channel',
    fieldTitle: 'Social Media Channel:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 5,
    name: 'post_url',
    fieldTitle: 'URL of Post',
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
export default function PartialSocialMedia() {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const dispatch = useDispatch();

  // Get toggle states from Redux store
  const { isAdd, isQuestionsContainerOpen, isSignContainerOpen } = useSelector(
    (state: any) => state.marketingTools.socialMedia
  );
  console.log(isAdd, isQuestionsContainerOpen, isSignContainerOpen);
  const handleClick = () => {
    dispatch(toggleAdd());
  };
  const formik = useFormik({
    initialValues: {
      post_title: '',
      advisor: '',
      date: '',
      channel: '',
      post_url: '',

      upload: ''
    },
    onSubmit: (values) => {
      if (
        values.post_title !== '' &&
        values.advisor !== '' &&
        values.date !== '' &&
        values.channel !== '' &&
        values.post_url !== '' &&
        values.upload !== ''
      ) {
        setIsBeginReview(true);
      } else {
        setIsAllFieldModal(true);
      }
    }
  });

  const handleSubmit = () => {
    dispatch(toggleQuestionsContainer());
  };

  const openSignContainer = () => {
    dispatch(toggleSignContainer());
  };

  return (
    <Box>
      <TopHeading>Social Media</TopHeading>

      <InitialForm
        fieldsData={fieldData}
        formik={formik}
        isAllFieldModal={isAllFieldModal}
        setIsAllFieldModal={setIsAllFieldModal}
      />

      {/* </form> */}

      {isBeginReview && (
        <Box sx={{ marginTop: '1rem' }}>
          <QuestionSection
            questions={questions}
            // openSignContainer={openSignContainer}
            answers={answers}
            setAnswers={setAnswers}
            // setIsSignInOpen={setIsSignInOpen}
          />
        </Box>
      )}
    </Box>
  );
}
