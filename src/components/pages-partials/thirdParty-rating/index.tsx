'use client';
import { Answer } from '@/store/app/types';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import RatingDisclouser from './modals/ratingDisclouser';
import MainComponentForm from '../main-component';
import useQuestionData from '@/hooks/useGetQuestionData';
const modalList = {
  list: [],
  modals: {}
};
const questions = [
  {
    id: 1,
    question:
      'Is there a reasonable belief that the surveys used for your rating are set up to make it equally as easy for someone to give positive and negative responses?',
    answerInstructions: 'If no, complete forms below. If yes, complete forms below.',
    notes:
      'The surveys must be set up to make it easy for participants to respond with positive and negative responses alike. If they are not, the survey results cannot be used.',

    subQuestions: [
      {
        text: '*Click to confirm the survey results will not be used in your marketing until you can show that the survey was set up for positive and negative responses alike.',
        isRadio: true
      }
    ],
    dragAndDrop: '*Upload documentation that demonstrates the survey setup complies with the rule.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 2,
    question: 'Was the survey created to provide a predetermined result?',
    answerInstructions: 'If no, complete forms below. If yes, complete forms below.',
    notes:
      'Survey results are valid only if the surveys were not created with a specific outcome in mind.',

    subQuestions: [
      {
        text: '*Provide details on how the survey was not designed to create a predetermined result.',
        isCheckbox: false
      },
      {
        text: '*Click to confirm the survey results will not be used in your marketing until you can show the survey was not created with a predetermined result in mind.',
        isRadio: true
      }
    ],
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 3,
    question: 'Is a disclosure displayed clearly and prominently by the third-party rating?',
    answerInstructions: 'If no, complete form below. If yes, move onto 4.',

    notes: (
      <RatingDisclouser
        text1="A disclosure is required for all third-party ratings posted."
        text2="to see an example for the proper placement of the disclosure"
      />
    ),
    subQuestions: [
      {
        text: '*Have you updated the location of the disclosure? If not, you cannot publish the third-party results.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated disclosure with a statement regarding whether compensation was give.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 4,
    question: (
      <Box>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
          Within the disclosure are the following elements included?
        </Typography>
        <ul>
          <li>The date on which the rating was given.</li>
          <li>The identity of the third party that created and tabulated the rating.</li>
          <li>
            If compensation has been provided in obtaining the third-party rating, including amount.
          </li>
        </ul>
      </Box>
    ),
    answerInstructions:
      'If yes, complete form below and move onto question 5.  If no, move onto 7.',

    notes: (
      <RatingDisclouser
        text1="Your third-party rating must include a disclosure that includes all 3 of these elements."
        text2="to see an example of a correct disclosure for third-party ratings."
      />
    ),
    // subQuestions: [
    //   {
    //     text: '*Details regarding why there is a conflict of interest.',
    //     isCheckbox: false
    //   }
    // ],
    dragAndDrop: '*Upload the disclosure with the 3 required elements included.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 5,
    question:
      'Do you have access to the questionnaire or survey used in connection with the third-party rating?',
    answerInstructions: 'If no, complete below. If yes, complete review.',

    notes:
      'Proper due diligence must be performed when placing a third-party rating. Locating the questionnaire or survey that was used in preparing the rating will satisfy this requirement. You must show the underlying structure of how the rating was determined.',
    subQuestions: [
      {
        text: '*Click to confirm the survey results will not be used in your marketing until you get access to the survey used.',
        isRadio: true
      }
    ],
    dragAndDrop:
      '*Upload the survey or questionnaire used for the ratings. You cannot publish the rating this is located.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  }
];
const fieldData = [
  {
    id: 1,
    name: 'title',
    fieldTitle: 'Name of Third-Party Providing the Rating  ',
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
    fieldTitle: 'CCO Review Date:',
    type: 'date',
    isFileUpload: false,
    columnSize: 2
  },
  {
    id: 4,
    name: 'original_location',
    fieldTitle: 'Current Location of the Rating',
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
const ThirdPartyRating = () => {
  const [ratingAnswers, setRatingAnswers] = useState<Answer[]>([]);
  const { data: thirdPartyData, loading } = useQuestionData('Third-Party Ratings');

  const initialValues = {
    title: '',
    advisor: '',
    date: '',
    original_location: '',
    currentTab: 'Third-Party Ratings',
    upload: ''
  };

  return (
    <MainComponentForm
      answers={ratingAnswers}
      setAnswers={setRatingAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={thirdPartyData}
      topHeading={'Third-Party Ratings'}
      modalList={modalList}
    />
  );
};

export default ThirdPartyRating;
