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
    fieldTitle: 'Name of Presentation:',
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
    name: 'audience',
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

const PartialPresentation = () => {
  const [presentationAnswers, setPresentationAnswers] = useState<Answer[]>([]);
  const { data: presentationQuestion, loading } = useQuestionData('Presentations');

  const initialValues = {
    title: '',
    advisor: '',
    date: '',
    audience: '',
    currentTab: 'Presentations',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={presentationAnswers}
      setAnswers={setPresentationAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={presentationQuestion}
      topHeading={'Presentations'}
      modalList={modalList}
    />
  );
};

export default PartialPresentation;
