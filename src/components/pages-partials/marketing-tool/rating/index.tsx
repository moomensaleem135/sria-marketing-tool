'use client';
import SharedLayout from '@/components/layout/shared-layout';

import { Container, FlexRow, Text, TextBlue, TextBold, TopHeading } from './index.styles';

import IconButton from '@mui/material/IconButton';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import React, { useState } from 'react';

import AddMarketingPieceForm from './MarketingPieceForm';
import QuestionSection from './QuestionSection';
import SignContainer from './SignContainer';

const questions = [
  {
    id: 1,
    question:
      'Is there a reasonable belief that the surveys used for your rating are set up to make it equally as easy for someone to give positive and negative responses?',
    detail:
      'The surveys must be setup to make it easy for participants to respond with positive and negative responses alike. If they are not, the survey results cannot be used.',
    subQuestions: [],
    dragAndDrop: '',
    isConfirm:
      'The surveys must be setup to make it easy for participants to respond with positive and negative responses alike. If they are not, the survey results cannot be used.',
    note: 'No'
  },
  {
    id: 2,
    question: 'Was the  survey created to provide a predetermined result?',
    detail:
      'Survey results are valid only if the surveys were not created with a specific outcome in mind.',
    subQuestions: [],
    dragAndDrop: '',
    isConfirm:
      'Click to confirm the survey results will not be used in your marketing until you can show the survey was not created with a predetermined result in mind.',
    note: 'No'
  },
  {
    id: 3,
    question: 'Is a disclosure displayed clearly and prominently by the third-party rating?',
    detail:
      'A disclosure is required for all third-party ratings posted. See example for the proper placement of the disclosure.',
    subQuestions: ['*Provide details on the current location of the disclosure.*'],
    dragAndDrop: '',
    isUpdated:
      'Have you updated the location of the disclosure? If not, you cannot publish the third-party results.',
    isConfirm: '',
    note: 'No'
  },
  {
    id: 4,
    question: 'Within the disclosure are the following elements included?',
    detail:
      'Your third-party rating must include a disclosure that included all 3 of these elements. See example of a correct disclosure for third-party ratings.',
    subQuestions: [],
    dragAndDrop: 'Upload the disclosure with the 3 required elements included*',
    isConfirm:
      'Have you updated the disclosure to include the 3 elements? If not, you cannot publish the rating.*',
    note: 'No'
  },
  {
    id: 5,
    question:
      'Do you have access to the questionnaire or survey used in connection with the third-party rating?',
    detail:
      'Proper due diligence must be performed when placing a third-party rating. Locating the questionnaire or survey that was used in preparing the rating will satisfy this requirement. You must show the underlying structure of how the rating was determined.',
    subQuestions: [],
    dragAndDrop:
      'Upload the survey or questionnaire used for the ratings. You cannot publish the rating until you locate this. *',
    isConfirm: '',
    note: 'No'
  }
];

export default function PartialRating() {
  const [isAdd, setIsAdd] = useState(false);
  const [toggleQuestionsContainer, settoggleQuestionsContainer] = useState(false);
  const [toggleSignContainer, settoggleSignContainer] = useState(false);

  const handleClick = () => {
    setIsAdd(!isAdd);
  };

  const initialValues = {
    name: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  const handleSubmit = () => {
    settoggleQuestionsContainer(!toggleQuestionsContainer);
  };

  const openSignContainer = () => {
    settoggleSignContainer(!toggleSignContainer);
  };

  return (
    <SharedLayout>
      <TopHeading>RIA Marketing Rule Review Tool</TopHeading>
      <Container>
        <Text>
          <TextBold>Instruction:</TextBold> Click the + sign to add a new marketing piece for
          review, then select from the dropdown to begin.
        </Text>
        <FlexRow>
          <IconButton
            onClick={handleClick}
            sx={{ color: `${COLORS.BLUE_TEXT}`, padding: '0px', marginRight: '5px' }}
          >
            {isAdd ? <Remove /> : <Add />}
            <TextBlue>Add Marketing Piece</TextBlue>
          </IconButton>
        </FlexRow>
        {isAdd && <AddMarketingPieceForm initialValues={initialValues} onSubmit={handleSubmit} />}
      </Container>
      {toggleQuestionsContainer && (
        <>
          <QuestionSection questions={questions} openSignContainer={openSignContainer} />
        </>
      )}

      {toggleSignContainer && <SignContainer />}
    </SharedLayout>
  );
}
