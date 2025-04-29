'use client';

import React, { useState } from 'react';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';

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
  const [emailCampaingsAnswers, setEmailCampaingsAnwers] = useState<Answer[]>([]);
  const initialValues = {
    campaign_name: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  return (
    <MainComponentForm
      answers={emailCampaingsAnswers}
      setAnswers={setEmailCampaingsAnwers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Email Campaigns or Newsletters'}
    />
  );
}
