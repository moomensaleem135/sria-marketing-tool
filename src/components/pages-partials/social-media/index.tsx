'use client';

import React, { useState } from 'react';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';

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
  const [socialAnswers, setSocialAnswers] = useState<Answer[]>([]);
  const initialValues = {
    post_title: '',
    advisor: '',
    date: '',
    channel: '',
    post_url: '',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={socialAnswers}
      setAnswers={setSocialAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Social Media'}
    />
  );
}
