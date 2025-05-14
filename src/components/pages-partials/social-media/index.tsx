'use client';

import React, { useState } from 'react';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';
import useQuestionData from '@/hooks/useGetQuestionData';
const modalList = {
  list: [],
  modals: {}
};
const fieldData = [
  {
    id: 1,
    name: 'title',
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
  const [socialAnswers, setSocialAnswers] = useState<Answer[]>([]);
  const { data: socialData, loading } = useQuestionData('Social Media');

  const initialValues = {
    title: '',
    advisor: '',
    date: '',
    channel: '',
    post_url: '',
    currentTab: 'Social Media',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={socialAnswers}
      setAnswers={setSocialAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={socialData}
      topHeading={'Social Media'}
      modalList={modalList}
    />
  );
}
