'use client';

import React, { useState } from 'react';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';

const fieldData = [
  {
    id: 1,
    name: 'broucher_title',
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
  const initialValues = {
    broucher_title: '',
    advisor: '',
    date: '',
    audience: '',
    broucher_location: '',

    upload: ''
  };

  return (
    <MainComponentForm
      answers={broucherAnswers}
      setAnswers={setBroucherAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Brochures'}
    />
  );
}
