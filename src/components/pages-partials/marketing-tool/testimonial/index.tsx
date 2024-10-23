'use client';
import SharedLayout from '@/components/layout/shared-layout';

import { Container, FlexRow, Text, TextBlue, TextBold, TopHeading } from './index.styles';

import IconButton from '@mui/material/IconButton';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAdd,
  toggleQuestionsContainer,
  toggleSignContainer
} from '@/store/marketingTools/componentSlices/testimonialSlice';

import AddMarketingPieceForm from './MarketingPieceForm';
import QuestionSection from './QuestionSection';
import SignContainer from './SignContainer';

const questions = [
  {
    id: 1,
    question: 'Is a disclosure displayed clearly and prominently by the testimonial/endorsement?',
    details:
      'A disclosure displayed clearly and prominently is required by the SEC for all testimonials posted. Click Here for an example of proper disclosure placement.',
    subQuestions: [
      'Details regarding the current location of the disclosure.',
      'Steps taken to create and properly place the disclosure for the testimonial/endorsement.'
    ],
    dragAndDrop:
      'Have you updated the disclosure? If not, you cannot publish or send to clients.* or prospective clients until addressed.Updated disclosure displayed clearly and prominently by testimonial/endorsement.*',
    note: 'No'
  },
  {
    id: 2,
    question:
      'In the disclosure, does it state whether the person giving the testimonial is a current client? Skip if Endorsement (non-client)',
    details:
      'The SEC requires each disclosure to state if the person giving the testimonial is a current or former client. Click Here for a good example.',
    subQuestions: [
      'Details regarding what, if any, details regarding client status are made in disclosure.',
      'Steps taken to update the disclosure.'
    ],
    dragAndDrop: 'Updated disclosure stating client status.',
    note: 'No'
  },
  {
    id: 3,
    question:
      'Was it stated, in the disclosure, whether the person giving the testimonial/endorsement received cash or non-cash (gifts or lower fees) compensation in exchange for their statement?',
    details:
      'SEC requires each disclosure to state if any compensation was exchanged and what type, cash or non-cash. Click Here to see an example of this statement in a disclosure.',
    subQuestions: [
      'Details regarding if any statement was made in the disclosure regarding compensation.',
      'Steps taken to include a statement regarding whether compensation was given.'
    ],
    dragAndDrop:
      'Have you updated the disclosure? If not, you cannot publish or send to clients.* or prospective clients until addressed.Updated disclosure with a statement regarding whether compensation was given.*',
    note: 'No'
  },
  {
    id: 4,
    question:
      'Is there a material conflict of interest between you or your firm and the person giving the testimonial/endorsement?',
    details:
      'If compensation is exchanged for a testimonial or endorsement, then a material conflict of interest exists. It’s required to state this conflict in the disclosure. Click Here for an example.',
    subQuestions: ['Details regarding why there is a conflict of interest.']
  },
  {
    id: 5,
    question: 'Have you stated there is a material conflict present in the disclosure?',
    details: 'Click Here for an example of a paid testimonial with a conflict of interest.',
    subQuestions: ['Details regarding why the conflict of interest is not disclosed.'],
    dragAndDrop:
      'Have you updated the disclosure to include there is a conflict-of-interest present? If not, you cannot publish or send to clients or prospective clients until addressed.*Upload the updated disclosure with the material conflict of interest statement.*',
    note: 'No'
  },
  {
    id: 6,
    question:
      'Was compensation given for $1,000 or more in exchange for the testimonial/endorsement?',
    details:
      'If compensation was given for $1,000 or more, a written agreement is required. A written agreement is not required for less than $1,000.',
    subQuestions: ['Details regarding the form of compensation provided and the amount.'],
    note: 'Yes'
  },
  {
    id: 7,
    question: 'Do you have a written agreement in place that details the following?',
    details:
      'Click Here for an example of a written agreement between you (the firm) and the client or promoter.',
    subQuestions: [],
    dragAndDrop:
      'A written agreement must be in place if more than $1,000 was paid to promoter or client? If not, you cannot publish testimonial until agreement is signed.*Upload written agreement for testimonial compensation.*',
    note: 'No'
  },
  {
    id: 8,
    question: 'Is the person providing the testimonial or endorsement considered a ‘bad actor’?',
    details:
      'The SEC prohibits someone with securities law convictions or other violations from acting as a promoter for investment advisors.',
    subQuestions: [],
    isUpdated:
      'I understand testimonials provided by people with federal securities law violations cannot be used for promoting the company in any way. I agree not to use any testimonial or promotion made by ‘bad actors’.*',
    note: 'No'
  },
  {
    id: 9,
    question:
      'I have read the 7 marketing rule prohibitions and agree they are not present in my testimonials, endorsements, or reviews.',
    details: ' ',
    subQuestions: [],
    note: 'Yes'
  }
];

export default function PartialTestimonial() {
  const dispatch = useDispatch();

  // Get toggle states from Redux store
  const { isAdd, isQuestionsContainerOpen, isSignContainerOpen } = useSelector(
    (state: any) => state.marketingTools.testimonial
  );
  console.log(isAdd, isQuestionsContainerOpen, isSignContainerOpen);
  const handleClick = () => {
    dispatch(toggleAdd());
  };

  const initialValues = {
    name: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  const handleSubmit = () => {
    dispatch(toggleQuestionsContainer());
  };

  const openSignContainer = () => {
    dispatch(toggleSignContainer());
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
      {isQuestionsContainerOpen && (
        <>
          <QuestionSection questions={questions} openSignContainer={openSignContainer} />
        </>
      )}

      {isSignContainerOpen && <SignContainer />}
    </SharedLayout>
  );
}
