import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import { useFormik } from 'formik';

import React, { useState } from 'react';

import {
  Container,
  FlexRow,
  Line,
  QuestionDiv,
  QuestionWrapper,
  QuestionDetails,
  SubQuestionDiv,
  SubQuestion,
  QuestionsHeading,
  TextBlue,
  Question,
  IsUpdatedDiv,
  ButtonRow,
  Example,
  Note,
  QuestionContainer
} from '../../index.styles';

import FieldInput from '@/components/core/FieldInput';
import Button from '@/components/core/Button';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import YesNoSelector from '../../YesNoSelector';
import CustomInputField from '@/components/core/FormikCustomInput';
import { AnswerData } from '@/store/app/types';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import NoContainer from '../SignContainer/noContainer';
import SignContainer from '../SignContainer';
import { BoldText } from '../../blogs-article/ReviewReport/index.styles';

interface Question {
  id: number;
  question: string;
  example: string;
  subQuestions: string[];
  answerInstructions: string;
  dragAndDrop?: string;
  isUpdated?: string;
  isUpdatedTrue: string;
  isUpdatedFalse: string;
  note: string;
}

interface Props {
  questions: Question[];
  answers: AnswerData[];
  setAnswers: (value: any) => void;
}

const QuestionSection: React.FC<Props> = ({ questions, answers, setAnswers }) => {
  const [exampleSwitch, setExampleSwitch] = useState<{ [key: number]: boolean }>(
    questions.reduce(
      (acc, q) => {
        acc[q.id] = false;

        return acc;
      },
      {} as { [key: number]: boolean }
    )
  );
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);

  const openSignContainer = () => {
    setIsSignInOpen(true);
  };

  const toggleExample = (id: number) => {
    setExampleSwitch((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectedYesNo = (questionID: number, option: string) => {
    setSelectedOption((prev) => ({
      ...prev,
      [questionID]: option
    }));
  };

  const shouldRenderSubQuestions = (question: any) => {
    const selected = selectedOption[question.id];

    if (question.note === 'Yes' && selected === 'Yes') {
      return true;
    }
    if (question.note === 'No' && selected === 'No') {
      return true;
    }

    return false;
  };

  const initialValues = questions.reduce(
    (acc, q) => {
      acc[`example${q.id}`] = q.example || '';
      q.subQuestions.forEach((_, index) => {
        acc[`subQuestion_${q.id}_${index}`] = '';
      });
      acc[`upload_${q.id}`] = '';
      acc[`isUpdated_${q.id}`] = '';
      acc[`option${q.id}`] = '';

      return acc;
    },
    {} as { [key: string]: string }
  );

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      localStorage.setItem('reviewAnswers', JSON.stringify(values));
      openSignContainer();
    }
  });

  const handleInputChange = (questionId: number, field: string, value: string) => {
    setAnswers((prev: AnswerData[]) => {
      const existingAnswerIndex = prev.findIndex((a) => a.id === questionId);

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          [field]: value
        };

        return updatedAnswers;
      } else {
        return [
          ...prev,
          {
            id: questionId,
            [field]: value
          }
        ];
      }
    });
    setIsSignInOpen(false);
  };

  const handleSubInputChange = (questionId: number, subKey: string, value: string) => {
    setAnswers((prev: AnswerData[]) => {
      const existingAnswerIndex = prev.findIndex((a) => a.id === questionId);

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev];
        const existingSubAnswers = updatedAnswers[existingAnswerIndex].subAnswers || {};

        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          subAnswers: {
            ...existingSubAnswers,
            [subKey]: value
          }
        };

        return updatedAnswers;
      } else {
        return [
          ...prev,
          {
            id: questionId,
            subAnswers: {
              [subKey]: value
            }
          }
        ];
      }
    });
    setIsSignInOpen(false);
  };

  const handleFileUpload = (questionId: number, file: string) => {
    setAnswers((prev: AnswerData[]) => {
      const existingAnswerIndex = prev.findIndex((a) => a.id === questionId);

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          fileUpload: file
        };

        return updatedAnswers;
      } else {
        return [
          ...prev,
          {
            id: questionId,
            fileUpload: file
          }
        ];
      }
    });
    setIsSignInOpen(false);
  };

  const getAnswer = (questionId: number) => {
    return answers.find((a) => a.id === questionId);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <QuestionsHeading>{questions.length} Questions</QuestionsHeading>
        <Line />
        {questions.map((q, index) => {
          const answer = getAnswer(q.id);

          return (
            <QuestionWrapper key={q.id}>
              <QuestionContainer>
                <QuestionDiv>
                  <Question>
                    {index + 1}. {q.question}
                  </Question>
                  <YesNoSelector
                    onSelect={(option: string) => {
                      handleInputChange(q.id, 'mainAnswer', option);
                      handleSelectedYesNo(q.id, option);
                    }}
                    selectedOption={answer?.mainAnswer}
                  />
                </QuestionDiv>
                {q?.answerInstructions && (
                  <Typography sx={{ fontSize: '0.8rem' }}>{q?.answerInstructions}</Typography>
                )}
              </QuestionContainer>

              {shouldRenderSubQuestions(q) && (
                <QuestionDetails>
                  <FlexRow>
                    <Box
                      onClick={() => toggleExample(q.id)}
                      sx={{
                        color: `${COLORS.BLUE_THEME_MAIN}`,
                        padding: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {!exampleSwitch[q.id] ? (
                        <Add sx={{ height: '20px', width: '17px' }} />
                      ) : (
                        <Remove sx={{ height: '20px', width: '17px' }} />
                      )}
                      <TextBlue>Example</TextBlue>
                    </Box>
                  </FlexRow>
                  {exampleSwitch[q.id] && <Example>{q.example}</Example>}
                  {q.subQuestions.map((subQuestion, subIndex) => (
                    <SubQuestionDiv key={subIndex}>
                      <SubQuestion>{subQuestion}</SubQuestion>
                      <FieldInput
                        name="sub"
                        value={answer?.subAnswers?.[`sub_${subIndex}`] || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleSubInputChange(q.id, `sub_${subIndex}`, e.target.value)
                        }
                        placeholder=""
                      />
                    </SubQuestionDiv>
                  ))}
                  {q.dragAndDrop && (
                    <SubQuestionDiv>
                      <SubQuestion>{q.dragAndDrop}</SubQuestion>
                      <FileUpload formik={formik} isDelete name={`upload_${q.id}`} />
                    </SubQuestionDiv>
                  )}
                  {q.isUpdated && (
                    <IsUpdatedDiv>
                      <Question style={{ fontWeight: 'bold' }}>{q.isUpdated}</Question>
                      <YesNoSelector
                        onSelect={(option: string) => handleInputChange(q.id, 'isUpdated', option)}
                        selectedOption={answer?.isUpdated}
                      />
                    </IsUpdatedDiv>
                  )}
                  {answer?.isUpdated && (
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        marginBottom: '1rem',
                        color: answer.isUpdated === 'Yes' ? 'green' : 'red'
                      }}
                    >
                      {answer.isUpdated === 'Yes' ? q.isUpdatedTrue : q.isUpdatedFalse}
                    </Typography>
                  )}
                </QuestionDetails>
              )}
            </QuestionWrapper>
          );
        })}
        <Line />
        <ButtonRow>
          <ButtonWitnLoading type="submit" text="Complete Review" />
        </ButtonRow>
      </Container>
      {answers.filter((ans) => ans.isUpdated === 'No').length > 0 &&
        isSignInOpen &&
        answers.length === questions.length && <NoContainer />}
      {answers.filter((ans) => ans.isUpdated === 'No').length === 0 &&
        isSignInOpen &&
        answers.length === questions.length && <SignContainer />}
    </form>
  );
};

export default QuestionSection;
