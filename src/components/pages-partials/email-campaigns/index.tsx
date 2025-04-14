'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAdd,
  toggleQuestionsContainer,
  toggleSignContainer
} from '@/store/marketingTools/componentSlices/emailSlice';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import InitialForm from '../initialForm';
import QuestionSection from '../websites/QuestionSection';
import { AnswerData } from '@/store/app/types';
import { questions } from '../websites';

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
  const [emailCampaingsAnswers, setEmailCampaingsAnwers] = useState<AnswerData[]>([]);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Get toggle states from Redux store
  const { isAdd, isQuestionsContainerOpen, isSignContainerOpen } = useSelector(
    (state: any) => state.marketingTools.email
  );
  console.log(isAdd, isQuestionsContainerOpen, isSignContainerOpen);
  const handleClick = () => {
    dispatch(toggleAdd());
  };

  const initialValues = {
    name: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  const handleSubmit = () => {
    dispatch(toggleQuestionsContainer());
  };

  const openSignContainer = () => {
    dispatch(toggleSignContainer());
  };
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
      {/* <Container>
        <Text>
          <TextBold>Instruction:</TextBold> Click the + sign to add a new marketing piece for
          review, then select from the dropdown to begin.
        </Text>
        <FlexRow>
          <IconButton
            onClick={handleClick}
            sx={{ color: `${COLORS.BLUE_THEME_MAIN}`, padding: '0px', marginRight: '5px' }}
          >
            {isAdd ? <Remove /> : <Add />}
            <TextBlue>Add Marketing Piece</TextBlue>
          </IconButton>
        </FlexRow>
        {isAdd && <AddMarketingPieceForm initialValues={initialValues} onSubmit={handleSubmit} />}
      </Container> */}
      {/* <AddMarketingPieceForm initialValues={initialValues} onSubmit={handleSubmit} /> */}

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
            answers={emailCampaingsAnswers}
            setAnswers={setEmailCampaingsAnwers}
            // setIsSignInOpen={setIsSignInOpen}
          />
        </Box>
      )}
    </Box>
  );
}
