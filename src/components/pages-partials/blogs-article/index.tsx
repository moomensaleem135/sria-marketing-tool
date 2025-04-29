'use client';

import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';

const fieldData = [
  {
    id: 1,
    name: 'blog_title',
    fieldTitle: 'Blog or Article Title:',
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
    fieldTitle: 'URL of Content:',
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

const PartialBlogArticle = () => {
  const [blogAnswers, setBlogAnswers] = useState<Answer[]>([]);

  // Get toggle states from Redux store
  const { isAdd, isQuestionsContainerOpen, isSignContainerOpen } = useSelector(
    (state: any) => state.marketingTools.blog
  );
  console.log(isAdd, isQuestionsContainerOpen, isSignContainerOpen);
  const initialValues = {
    blog_title: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  return (
    <MainComponentForm
      answers={blogAnswers}
      setAnswers={setBlogAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Blogs or Articles'}
    />
  );
};
export default PartialBlogArticle;
