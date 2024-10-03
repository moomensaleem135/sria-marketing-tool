'use client';
import React, { useEffect, useState } from 'react';
import {
  FlexCol,
  MainHeading,
  Text,
  Question,
  QuestionDiv,
  SubQuestionDiv,
  SubQuestion,
  Answer
} from './index.styles';
import { Line, QuestionWrapper } from '../QuestionSection/index.styles';
import YesNoSelector from '../../YesNoSelector';

interface Question {
  id: number;
  question: string;
  subQuestions: string[];
  dragAndDrop?: string;
  isUpdated?: string;
}

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

const ReviewReport: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedAnswers = localStorage.getItem('reviewAnswers');
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  console.log(answers);

  return (
    <FlexCol>
      <MainHeading>Marketing Review Report</MainHeading>
      <Text>Name of Firm</Text>
      <Text>Marketing Piece Title – (See attached)</Text>
      <Text>Date of Review</Text>
      <Line />

      {questions.map((q, index) => (
        <QuestionWrapper key={q.id}>
          <QuestionDiv>
            <Question>
              {index + 1}. {q.question}
            </Question>
            <YesNoSelector
              onSelect={() => {}}
              selectedOption={answers[`option_${q.id}`] || null}
              readOnly
            />
          </QuestionDiv>

          {answers[`option_${q.id}`] === 'Yes' && (
            <SubQuestionDiv>
              {q.subQuestions.map((subQuestion, index) => (
                <div key={index}>
                  <SubQuestion>{subQuestion}</SubQuestion>
                  <Answer>{answers[`subQuestion_${q.id}_${index}`] || 'No answer provided'}</Answer>
                </div>
              ))}

              {q.dragAndDrop && (
                <SubQuestion>
                  {answers[`upload_${q.id}`]
                    ? 'See attached for updated bio in post.'
                    : 'No File Uploaded'}
                </SubQuestion>
              )}

              {q.isUpdated && (
                <>
                  <SubQuestion>{q.isUpdated}</SubQuestion>
                  <YesNoSelector
                    onSelect={() => {}}
                    selectedOption={answers[`isUpdated_${q.isUpdated}`] || null}
                    readOnly
                  />
                </>
              )}
            </SubQuestionDiv>
          )}
        </QuestionWrapper>
      ))}
      <Line />
    </FlexCol>
  );
};

export default ReviewReport;
