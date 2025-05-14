'use client';

import React, { useState } from 'react';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';
import useQuestionData from '../../../hooks/useGetQuestionData';
const modalList = {
  list: [],
  modals: {}
};
const fieldData = [
  {
    id: 1,
    name: 'title',
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
  const { data: emailCampaingData, loading } = useQuestionData('Email Campaigns or Newsletters');

  const initialValues = {
    title: '',
    advisor: '',
    date: '',
    URL: '',
    currentTab: 'Email Campaigns or Newsletters',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={emailCampaingsAnswers}
      setAnswers={setEmailCampaingsAnwers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={emailCampaingData}
      topHeading={'Email Campaigns or Newsletters'}
      modalList={modalList}
    />
  );
}
