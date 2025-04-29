'use client';

import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Answer } from '@/store/app/types';

import TestimonialEndorsementModal from './testimonalExemptionModal';
import DisclouserExampleModal from './DisclouserExampleModal';
import ClientEndorsementModal from './Client-Endorsement-Modal';
import CompensationModal from './Compensation-Modal';
import DisclouserConflicts from './Disclouser-Conflicts';
import PaidTestimonial from './Paid-Testimonial';
import WrittenAgreement from './Wriiten-Agreement';
import TestimonialProhibitation from './Testimonial-Prohibitation';
import MainComponentForm from '../main-component';

const questions = [
  {
    id: 1,
    question: <TestimonialEndorsementModal />,
    answerInstructions: 'If no, complete forms below. If yes, move on to 2.',
    notes: <DisclouserExampleModal />,

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
    dragAndDrop:
      '*Updated disclosure displayed clearly and prominently by testimonial/endorsement.',
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
    question:
      'In the disclosure, does it state whether the person giving the testimonial is a current client or investor, or if an endorsement someone other than a current client or investor?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 3.',

    notes: <ClientEndorsementModal />,

    subQuestions: [
      {
        text: '*Details regarding if there is any mention of client/non-client status made.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to update the disclosure to include client (testimonial) or non-client (endorsement) status.',
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
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 3,
    question:
      'Was it stated, in the disclosure, whether the person giving the testimonial/endorsement received cash or non-cash (gifts or lower fees) compensation in exchange for their statement?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 4.',

    notes: <CompensationModal />,
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
    dragAndDrop: '*Updated disclosure with a statement regarding whether compensation was given.',
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
    question:
      'Is there a material conflict of interest between you or your firm and the person giving the testimonial/endorsement?',
    answerInstructions:
      'If yes, complete form below and move onto question 5.  If no, move onto 7.',

    notes: <DisclouserConflicts />,
    subQuestions: [
      {
        text: '*Details regarding why there is a conflict of interest.',
        isCheckbox: false
      }
    ],
    // dragAndDrop: '*Updated Marketing Piece',
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
    question: 'Have you stated there is a material conflict present in the disclosure?',
    answerInstructions: 'If yes, move onto question 6. If no, complete form below.',

    notes: <PaidTestimonial />,
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
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 6,
    question:
      'Was compensation given for $1,000 or more in exchange for the testimonial/endorsement?',
    answerInstructions: 'If no, move onto 8. If yes, complete the form then move onto 7.',

    notes:
      'If compensation was given for $1,000 or more, then a written agreement is required. A written agreement is not required for less than $1,000.',
    subQuestions: [
      {
        text: '*Details regarding the form of compensation provided and the amount.',
        isCheckbox: false
      }
    ],
    // dragAndDrop: '*Upload the ad showing both net of fees and the total portfolio are included.',
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
    id: 7,
    question: (
      <Box sx={{ marginLeft: '0.3rem' }}>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
          Do you have a written agreement in place that details the following?
        </Typography>
        <ul>
          <li style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>The parties involved</li>
          <li style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Date of the testimonial</li>
          <li style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Amount of compensation paid</li>
          <li style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            Form of compensation: Cash or non-cash
          </li>
          <li style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            Details regarding the agreement
          </li>
        </ul>
      </Box>
    ),
    answerInstructions: 'If no, move onto 10. If yes, complete forms below.',

    notes: <WrittenAgreement />,
    isMultipleNotes: false,
    subQuestions: [
      {
        text: '*A written agreement must be in place if more than $1,000 was paid to the promoter or client. If not, you cannot publish the testimonial until the agreement is signed.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Upload written agreement for testimonial/endorsement compensation.',
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
    id: 8,
    question: 'Is the person providing the testimonial or endorsement considered a ‘bad actor’?',
    // answerInstructions:
    //   'If N/A, move onto 10. If no, complete the questions below. If yes, move onto 9.',

    isQuestionWithNA: false,
    notes:
      'The SEC prohibits someone who has a criminal conviction or other federal securities law violations from acting as a promoter for investment advisors. You are prohibited from using testimonials or endorsements by people with securities law convictions or other violations.',
    isMultipleNotes: false,
    // subQuestions: [
    //   {
    //     text: '*Provide details on which, if any, of the three conditions have been met. If you can’t provide details and demonstrate all 3 conditions are met, then the ad can’t be published.',
    //     isCheckbox: false
    //   }
    // ],
    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
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
    id: 9,
    question: <TestimonialProhibitation />,
    // answerInstructions:
    //   'If N/A, move onto 10. If no, move onto 10. If yes, complete the confirmation below.',

    // isQuestionWithNA: true,
    // notes: (
    //   <Box>
    //     <ol>
    //       <li>
    //         Investors who don’t have access to the resources to independently analyze such
    //         hypothetical performance; or
    //       </li>
    //       <li>
    //         Investors who don’t have sufficient financial experience to understand the risks and
    //         limitations of hypothetical performance.
    //       </li>
    //     </ol>
    //   </Box>
    // ),
    isMultipleNotes: false,
    // subQuestions: [
    //   {
    //     text: '*I confirm the ad. will not be distributed to those that don’t have access to the resources to independently analyze such hypothetical performance; or those that don’t have sufficient financial experience to understand the risks and limitations of hypothetical performance.',
    //     isRadio: true
    //   }
    // ],
    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
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
    name: 'full_name',
    fieldTitle: 'Full Name:',
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
    name: 'testimonail',
    fieldTitle: 'Testimonial, Endorsement:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 5,
    name: 'ad_url',
    fieldTitle: 'Location of Ad or URL:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },

  {
    id: 6,
    name: 'upload',
    fieldTitle: ' Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):',
    type: 'upload',
    isFileUpload: true,
    columnSize: 12
  }
];

export default function PartialTestimonial() {
  const [testimonialAnswers, setTestimonialAnswers] = useState<Answer[]>([]);
  const initialValues = {
    full_name: '',
    advisor: '',
    date: '',
    testimonail: '',
    ad_url: '',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={testimonialAnswers}
      setAnswers={setTestimonialAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Testimonials & Endorsements'}
    />
  );
}
