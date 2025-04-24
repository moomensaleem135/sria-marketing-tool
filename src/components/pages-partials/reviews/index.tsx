'use client';

import { TopHeading } from './index.styles';

import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import InitialForm from '../initialForm';
import { useFormik } from 'formik';
import { Answer } from '@/store/app/types';
import QuestionSection from '../performance-advertising/QuestionSection';
import ReviewDisclouser from './modals/reviewDisclouser';
import TestimonialDisclouserExample from './modals/testimonialDisclouserExample';
import PaidReviews from './modals/paidReviews';
import ReviewAgreement from './modals/reviewAgreement';
import AdvertisingProhibitation from './modals/advertisingProhibitation';

const questions = [
  {
    id: 1,
    question: <TestimonialDisclouserExample />,
    answerInstructions: 'If no, complete forms below. If yes, move on to 2.',
    notes: (
      <ReviewDisclouser
        text1={
          'A disclosure displayed clearly and prominently is required by the SEC for reviews posted.'
        }
        text2="for an example of proper online review disclosure placement."
        colorText={'currentClients'}
      />
    ),

    subQuestions: [
      {
        text: '*Details regarding the location of the disclosure if not clear and prominent.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to create and properly place the disclosure for the testimonial/endorsement.',
        isCheckbox: false
      },
      {
        text: '*Have you updated the disclosure? If not, you cannot publish or send to clients or prospective clients until addressed.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated disclosure displayed clearly and prominently by the review.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 2,
    question:
      'In the disclosure, does it state whether the person giving the review is a current client or investor?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 3.',
    notes: (
      <ReviewDisclouser
        text1="The SEC requires each disclosure to state if the person giving the review was a current client, investor, or someone else."
        text2=" for an example."
        colorText={'currentClient'}
      />
    ),

    subQuestions: [
      {
        text: '*Details regarding if there is any mention of client/non-client status made.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to update the disclosure to include client status in the review.',
        isCheckbox: false
      },
      {
        text: '*Have you updated the disclosure? If not, you cannot publish or send to clients or prospective clients until addressed.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated disclosure.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 3,
    question:
      'Was it stated, in the disclosure, whether the person giving the review received cash or non-cash (gifts or lower fees) compensation in exchange for their statement?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 4.',

    notes: (
      <ReviewDisclouser
        text1="The SEC requires each disclosure to state if any compensation was exchanged and what type—cash or non-cash. "
        text2=" for an example."
        colorText={'noCompensation'}
      />
    ),
    subQuestions: [
      {
        text: '*Details regarding if any statement was made in the disclosure regarding compensation.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to include a statement regarding whether compensation was given.',
        isCheckbox: false
      },
      {
        text: '*Have you updated the disclosure? If not, you cannot publish or send to clients or prospective clients until addressed.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated disclosure with a statement regarding whether compensation was give.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 4,
    question:
      'Is there a material conflict of interest between you or your firm and the person giving the review?',
    answerInstructions:
      'If yes, complete form below and move onto question 5.  If no, move onto 7.',

    notes: (
      <ReviewDisclouser
        text1="If compensation is exchanged for a review, then a material conflict of interest exists. It’s required to state this conflict in the disclosure."
        text2=" for an example."
        colorText={'noConflicts'}
      />
    ),
    subQuestions: [
      {
        text: '*Details regarding why there is a conflict of interest.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 5,
    question: 'Have you stated there is a material conflict present in the disclosure?',
    answerInstructions: 'If yes, move onto question 6. If no, complete form below.',

    notes: <PaidReviews />,
    subQuestions: [
      {
        text: '*Details regarding why the conflict of interest is not disclosed.',
        isCheckbox: false
      },

      {
        text: '*Have you updated the disclosure to include there is a conflict-of-interest present? If not, you cannot publish or send to clients or prospective clients until addressed.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Upload the updated disclosure with the material conflict of interest statement.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 6,
    question: 'Was compensation given for $1,000 or more in exchange for the review?',
    answerInstructions: 'If no, move onto 8. If yes, complete the form then move onto 7.',

    notes:
      'If compensation was given for $1,000 or more, then a written agreement is required. A written agreement is not required for less than $1,000.',
    subQuestions: [
      {
        text: '*Details regarding the form of compensation provided and the amount.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Upload the ad showing both net of fees and the total portfolio are included.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 7,
    question: (
      <Box>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
          Do you have a written agreement in place that details the following?
        </Typography>
        <ul>
          <li>The parties involved</li>
          <li>Date of the testimonial</li>
          <li>Amount of compensation paid</li>
          <li>Form of compensation: Cash or non-cash</li>
          <li>Details regarding the agreement</li>
        </ul>
      </Box>
    ),
    answerInstructions: 'If no, complete form below. If yes, upload agreement and move onto 8.',

    notes: <ReviewAgreement />,
    subQuestions: [
      {
        text: '*Have you updated the disclosure to include there is a conflict-of-interest present? If not, you cannot publish or send to clients or prospective clients until addressed.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Upload written agreement for the review.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 8,
    question: 'Is the person providing the review considered a ‘bad actor’?',
    answerInstructions: 'If no, complete the form. If yes, complete the form.',

    isQuestionWithNA: false,
    notes:
      'The SEC prohibits someone who has a criminal conviction or other federal securities law violations from acting as a promoter for investment advisors. You are prohibited from using reviews by people with securities law convictions or other violations as advertisements.',
    subQuestions: [
      {
        text: '* I understand reviews provided by people with federal securities law violations cannot be used for promoting the company in any way. I agree not to use any review made by ‘bad actors.’',
        isRadio: true
      }
    ],
    dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 9,
    question:
      'I have read the 7 marketing rule prohibitions and agree they are not present in my reviews.',

    isQuestionWithNA: false,
    notes: <AdvertisingProhibitation />,
    isMultipleNotes: false,

    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  }
];
const fieldData = [
  {
    id: 1,
    name: 'review_name',
    fieldTitle: 'Full Name of Person Giving Review:',
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
    fieldTitle: 'Original Location of Review:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 5,
    name: 'current_location',
    fieldTitle: 'Current Location of Review ',
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
const PartialReviews = () => {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const formik = useFormik({
    initialValues: {
      review_name: '',
      advisor: '',
      date: '',
      original_location: '',
      current_location: '',

      upload: ''
    },
    onSubmit: (values) => {
      if (
        values.review_name !== '' &&
        values.advisor !== '' &&
        values.date !== '' &&
        values.original_location !== '' &&
        values.current_location !== '' &&
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
      <TopHeading>Reviews</TopHeading>
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
            answers={answers}
            setAnswers={setAnswers}
            fieldData={fieldData}
            formik={formik}
          />
        </Box>
      )}
    </Box>
  );
};
export default PartialReviews;
