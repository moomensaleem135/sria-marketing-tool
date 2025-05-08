'use client';

import React, { useEffect, useState } from 'react';

import { Answer } from '@/store/app/types';

import MainComponentForm from '../main-component';
import { GetQuestionsService } from '@/services/app';
import { toast } from 'react-toastify';

export const questions = [
  {
    id: 1,
    question:
      'Does the piece include any untrue statements of material fact, or does it leave out any material fact?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 2.',

    example:
      '“During the last year our performance overall was positive.” Stating this when your overall performance was positive but underperformed the market.',
    subQuestions: [
      {
        text: '*Details regarding untrue statements or the specific omission of material fact.',
        isCheckbox: false
      },
      {
        text: '*How has the statement been corrected?',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 2,
    question:
      'Does the marketing contain a material statement of fact that cannot be substantiated?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 3.',

    example:
      'In your last newsletter a reference is made to performance of the market in a specific region, yet a copy of the benchmark isn’t kept in your records.',
    subQuestions: [
      {
        text: '*Details regarding the unsubstantiated fact.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to correct or substantiate the statement.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    isUpdated:
      '*Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.*',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 3,
    question:
      'Does the piece include information that may cause an untrue or misleading implication to be drawn by the investor regarding a material fact?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 4.',

    example:
      '“All my clients have seen profits from my model portfolio in each of the last 5 years.” This is true however the advisor only has 3 clients.',
    subQuestions: [
      {
        text: '*Details regarding the misleading implication relating to the investment adviser.',
        isCheckbox: false
      },
      {
        text: '*How has the statement been corrected?',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    isUpdated:
      '*Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 4,
    question:
      'Does your piece present the potential benefits of your specific investment advice without providing the fair and balanced treatment of the possible risks or drawbacks associated with the potential benefits?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 5.',

    example:
      'Presenting your results from last quarter on a website and not including a disclosure with the risks, limitations and potential downsides to the specific portfolio.',
    subQuestions: [
      {
        text: '*Details regarding how and why the ad did not provide the risks, limitations and drawbacks to the adviser’s advice.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to include a fair and balanced treatment of the ad.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 5,
    question:
      ' Does the piece include reference to specific investment advice where the advice is not presented in a fair and balanced way?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 6.',

    example:
      'Showing a client a positive case study as part of an investment strategy that resulted in unprofitable results, overall. The overall performance of the strategy must be disclosed during the same time period of the case study.',
    subQuestions: [
      {
        text: '*Details regarding how the content is not presented in a fair and balanced way',
        isCheckbox: false
      },
      {
        text: '*How has the marketing content been corrected?',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 6,
    question:
      'Does your marketing piece show only positive performance results during a short period of time or over inconsistent time periods?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 7.',

    example: 'When an adviser shows results in a portfolio for 9 out of the last 12 months.',
    subQuestions: [
      {
        text: '*Details regarding how and why partial or inconsistent time periods are shown in the advertisement.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to include a more complete time period.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated marketing piece with complete time period.”',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 7,
    question:
      'Are there words or phrases used in your marketing piece that are materially misleading?',
    answerInstructions: 'If yes, complete form below. If no, move on to question 8.',

    example:
      'Using words such as “Trusted, Best, Top-Rated, Maximum Wealth, Most. Guaranteed, Risk Free or Only.”',
    subQuestions: [
      {
        text: '*List the words used and how they are materially misleading.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to include different words and phrases that aren’t misleading?',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated content without the misleading words.',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 8,
    question: 'Does the ad take into consideration its target audience?',
    answerInstructions: 'If no, complete form below.',

    example:
      'Are you writing or speaking to a specific person or institution such as a retail vs institutional investor?',
    subQuestions: [
      {
        text: '*Details on how the ad is not considering its target audience.',
        isCheckbox: false
      },
      {
        text: '*Steps taken to update the ad and consider your target audience.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Updated advertising piece clearly speaking to a specific audience.',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  }
];
const fieldData = [
  {
    id: 1,
    name: 'pageName',
    fieldTitle: 'Website / Page name:',
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
    fieldTitle: 'Location of Ad or URL:',
    type: 'text',
    isFileUpload: false,
    columnSize: 12
  },
  {
    id: 5,
    name: 'upload',
    fieldTitle: ' Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):',
    type: 'upload',
    isFileUpload: true,
    columnSize: 12
  }
];
export default function PartialWebsiteDomain() {
  const [websiteAnswers, setWebsiteAnswers] = useState<Answer[]>([]);
  const [websiteQuestions, setWebsiteQuestions] = useState<Answer[]>([]);


  const initialValues = {
    pageName: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };
const getQuestionData=async()=>{
try {
  const resp=await GetQuestionsService('Websites')
  if(resp){
    setWebsiteQuestions(resp.data.questions)

  }
} catch (error) {
  toast.error(`${error}`)
}
}
useEffect(() => {
  getQuestionData()
}, [])
console.log('websiteQuestions',websiteQuestions)

  return (
    <MainComponentForm
      answers={websiteAnswers}
      setAnswers={setWebsiteAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={websiteQuestions.filter((question)=>question.id===1)}
      topHeading={'Websites'}
    />
  );
}
