'use client';
import SharedLayout from '@/components/layout/shared-layout';

import { Container, FlexRow, Text, TextBlue, TextBold, TopHeading } from './index.styles';

import IconButton from '@mui/material/IconButton';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import React, { useState } from 'react';

import AddMarketingPieceForm from './MarketingPieceForm';
import QuestionSection from './QuestionSection';
import SignContainer from './SignContainer';

const questions = [
  {
    id: 1,
    question:
      'Does the piece include any untrue statements of material fact, or does it leave out any material fact?',
    example:
      '“During the last year our performance overall was positive.” Stating this when your overall performance was positive but underperformed the market.',
    subQuestions: ['Please specify the untrue statements.', 'Provide the omitted material facts.'],
    dragAndDrop: 'Updated Marketing Piece',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  },
  {
    id: 2,
    question:
      'Does the marketing contain a material statement of fact that cannot be substantiated?',
    example:
      'In your last newsletter a reference is made to performance of the market in a specific region, yet a copy of the benchmark isn’t kept in your records.',
    subQuestions: [
      'Details regarding the unsubstantiated fact.',
      'Steps taken to correct or substantiate the statement.'
    ],
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.*'
  },
  {
    id: 3,
    question:
      'Does the piece include information that may cause an untrue or misleading implication to be drawn by the investor regarding a material fact?',
    example:
      '“All my clients have seen profits from my model portfolio in each of the last 5 years.” This is true however the advisor only has 3 clients.',
    subQuestions: [
      'Details regarding the misleading implication relating to the investment adviser.',
      'How has the statement been corrected?'
    ],
    dragAndDrop: 'Updated Marketing Piece',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  },
  {
    id: 4,
    question:
      'Does your piece present the potential benefits of your specific investment advice without providing the fair and balanced treatment of the possible risks or drawbacks associated with the potential benefits?',
    example:
      'Presenting your results from last quarter on a website and not including a disclosure with the risks, limitations and potential downsides to the specific portfolio.',
    subQuestions: [
      'Presenting your results from last quarter on a website and not including a disclosure with the risks, limitations and potential downsides to the specific portfolio.',
      'Steps taken to include a fair and balanced treatment of the ad.'
    ],
    dragAndDrop: 'Steps taken to include a fair and balanced treatment of the ad.',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  },
  {
    id: 5,
    question:
      ' Does the piece include reference to specific investment advice where the advice is not presented in a fair and balanced way?',
    example:
      'Showing a client a positive case study as part of an investment strategy that resulted in unprofitable results, overall. The overall performance of the strategy must be disclosed during the time period of the case study.',
    subQuestions: [
      'Showing a client a positive case study as part of an investment strategy that resulted in unprofitable results, overall. The overall performance of the strategy must be disclosed during the time period of the case study.*',
      'Steps taken to include a fair and balanced treatment of the ad.'
    ],
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  },
  {
    id: 6,
    question:
      'Does your marketing piece show only positive performance results during a short period of time or over inconsistent time periods?',
    example: 'When an adviser shows results in a portfolio for 9 out of the last 12 months.',
    subQuestions: [
      'When an adviser shows results in a portfolio for 9 out of the last 12 months.',
      'When an adviser shows results in a portfolio for 9 out of the last 12 months.'
    ],
    dragAndDrop: 'Steps taken to include a fair and balanced treatment of the ad.',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  },
  {
    id: 7,
    question:
      'Are there words or phrases used in your marketing piece that are materially misleading ?',
    example: 'Words such as “Trusted, best, top-rated, maximum wealth, most or only”',
    subQuestions: [
      'Words such as “Trusted, best, top-rated, maximum wealth, most or only”.',
      'Steps taken to include different words and phrases that aren’t misleading.'
    ],
    dragAndDrop: 'Updated advertising piece without misleading words.',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  },
  {
    id: 8,
    question: 'Does the ad take into consideration its target audience?',
    example:
      'Are you writing or speaking to a specific person or institution such as a retail vs institutional investor?',
    subQuestions: [
      'Are you writing or speaking to a specific person or institution such as a retail vs institutional investor?',
      'Are you writing or speaking to a specific person or institution such as a retail vs institutional investor?'
    ],
    dragAndDrop:
      'Are you writing or speaking to a specific person or institution such as a retail vs institutional investor?',
    isUpdated:
      'Has the advertising piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.'
  }
];

export default function PartialBlog() {
  const [isAdd, setIsAdd] = useState(false);
  const [toggleQuestionsContainer, settoggleQuestionsContainer] = useState(false);
  const [toggleSignContainer, settoggleSignContainer] = useState(false);

  const handleClick = () => {
    setIsAdd(!isAdd);
  };

  const initialValues = {
    name: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  const handleSubmit = () => {
    settoggleQuestionsContainer(!toggleQuestionsContainer);
  };

  const openSignContainer = () => {
    settoggleSignContainer(!toggleSignContainer);
  };

  return (
    <SharedLayout>
      <TopHeading>RIA Marketing Rule Review Tool</TopHeading>
      <Container>
        <Text>
          <TextBold>Instruction:</TextBold> Click the + sign to add a new marketing piece for
          review, then select from the dropdown to begin.
        </Text>
        <FlexRow>
          <IconButton
            onClick={handleClick}
            sx={{ color: `${COLORS.BLUE_TEXT}`, padding: '0px', marginRight: '5px' }}
          >
            {isAdd ? <Remove /> : <Add />}
            <TextBlue>Add Marketing Piece</TextBlue>
          </IconButton>
        </FlexRow>
        {isAdd && <AddMarketingPieceForm initialValues={initialValues} onSubmit={handleSubmit} />}
      </Container>
      {toggleQuestionsContainer && (
        <>
          <QuestionSection questions={questions} openSignContainer={openSignContainer} />
        </>
      )}

      {toggleSignContainer && <SignContainer />}
    </SharedLayout>
  );
}
