'use client';

import React, { useEffect, useState } from 'react';

import { Answer, Question } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';
import { GetQuestionsService } from '@/services/app';
import { toast } from 'react-toastify';
import useQuestionData from '../../../hooks/useGetQuestionData';
const modalList = {
  list: [],
  modals: {}
};
const fieldData = [
  {
    id: 1,
    name: 'title',
    fieldTitle: 'Title of Brochures:',
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
    name: 'broucher_location',
    fieldTitle: 'Brochures Location',
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
export default function PartialBrochure() {
  const [broucherAnswers, setBroucherAnswers] = useState<Answer[]>([]);
  const { data: broucherQuestions, loading } = useQuestionData('Brochures');

  const initialValues = {
    title: '',
    advisor: '',
    date: '',
    audience: '',
    broucher_location: '',
    currentTab: 'Brochures',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={broucherAnswers}
      setAnswers={setBroucherAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={broucherQuestions}
      topHeading={'Brochures'}
      modalList={modalList}
    />
  );
}
