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
    fieldTitle: 'Title of Video:',
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
    fieldTitle: 'Intended Auidence:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 5,
    name: 'video_url',
    fieldTitle: 'Video URL',
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

export default function PartialVideo() {
  const [videoAnswers, setVideoAnswers] = useState<Answer[]>([]);
  const { data: videoData, loading } = useQuestionData('Videos');

  const initialValues = {
    title: '',
    advisor: '',
    date: '',
    audience: '',
    video_url: '',
    currentTab: 'Videos',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={videoAnswers}
      setAnswers={setVideoAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={videoData}
      topHeading={'Videos'}
      modalList={modalList}
    />
  );
}
