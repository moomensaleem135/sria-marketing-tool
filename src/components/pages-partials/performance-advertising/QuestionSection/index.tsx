import { Box, Radio, Typography } from '@mui/material';
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
  QuestionContainer
} from '../../index.styles';

import FieldInput from '@/components/core/FieldInput';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import YesNoSelector from '../../YesNoSelector';
import { AnswerData } from '@/store/app/types';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import NoContainer from '../../websites/SignContainer/noContainer';
import SignContainer from '../../websites/SignContainer';
import CustomModal from '@/components/core/Modal';

interface SubQuestion {
  text: string;
  isCheckbox?: boolean;
  isRadio?: boolean;
}

interface IQuestion {
  id: number;
  question: string | React.ReactNode;
  answerInstructions?: string;
  notes?: string | React.ReactNode | undefined;
  details?: string | React.ReactNode | undefined;
  notes2?: string | React.ReactNode | undefined;
  example?: string | React.ReactNode | undefined;
  subQuestions?: SubQuestion[];
  dragAndDrop?: string;
  note: string;
  isUpdatedTrue: string;
  isUpdated?: boolean;
  isUpdatedFalse: string;
  isMultipleNotes?: boolean;
  isQuestionWithNA?: boolean;
}

interface Props {
  questions: IQuestion[];
  answers: AnswerData[];
  setAnswers: (value: any) => void;
}
type FormFieldValue = string | boolean | File | null;
type InitialValues = Record<string, FormFieldValue>;
const QuestionSection: React.FC<Props> = ({ questions, answers, setAnswers }) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: {
      example?: boolean;
      notes?: boolean;
      details?: boolean;
      notes2?: boolean;
    };
  }>(
    questions.reduce(
      (acc, q) => {
        acc[q.id] = {};

        return acc;
      },
      {} as { [key: number]: any }
    )
  );

  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isClearAllModal, setIsClearAllModal] = useState<boolean>(false);

  const openSignContainer = () => {
    setIsSignInOpen(true);
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

  const initialValues = questions.reduce<InitialValues>((acc, q) => {
    // Handle example field
    acc[`example${q.id}`] =
      typeof q.example === 'string'
        ? q.example
        : q.example
          ? 'Has example' // Convert JSX to simple string
          : '';

    // Handle subQuestions
    q.subQuestions?.forEach((_, index) => {
      acc[`subQuestion_${q.id}_${index}`] = '';
    });

    // Other fields
    acc[`upload_${q.id}`] = null;
    acc[`isUpdated_${q.id}`] = false;
    acc[`option${q.id}`] = '';

    return acc;
  }, {});

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
  const toggleSection = (id: number, section: 'example' | 'notes' | 'details' | 'notes2') => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [section]: !prev[id][section]
      }
    }));
  };
  const renderExpandableSection = (
    id: number,
    type: 'example' | 'notes' | 'details' | 'notes2',
    content?: string | React.ReactNode | undefined,
    label?: string
  ) => {
    if (!content) return null;

    return (
      <>
        <FlexRow>
          <Box
            onClick={() => toggleSection(id, type)}
            sx={{
              color: `${COLORS.BLUE_THEME_MAIN}`,
              padding: '0px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            {!expandedSections[id][type] ? (
              <Add sx={{ height: '20px', width: '17px' }} />
            ) : (
              <Remove sx={{ height: '20px', width: '17px' }} />
            )}
            <TextBlue>{label}</TextBlue>
          </Box>
        </FlexRow>
        {expandedSections[id][type] && <Example>{content}</Example>}
      </>
    );
  };
  const handleClearAll = () => {
    setAnswers([]);
    setIsClearAllModal(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 15px'
          }}
        >
          <QuestionsHeading>{questions.length} Questions</QuestionsHeading>
          <span style={{ cursor: 'pointer' }} onClick={() => setIsClearAllModal(true)}>
            <Typography sx={{ fontSize: '0.8rem', color: 'red' }}>Clear All</Typography>
          </span>
        </Box>
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
                  {q.isQuestionWithNA === true ? (
                    <YesNoSelector
                      options={['Yes', 'No', 'N/A']}
                      onSelect={(option: string) => {
                        handleInputChange(q.id, 'mainAnswer', option);
                        handleSelectedYesNo(q.id, option);
                      }}
                      selectedOption={answer?.mainAnswer}
                    />
                  ) : (
                    <YesNoSelector
                      onSelect={(option: string) => {
                        handleInputChange(q.id, 'mainAnswer', option);
                        handleSelectedYesNo(q.id, option);
                      }}
                      selectedOption={answer?.mainAnswer}
                    />
                  )}
                </QuestionDiv>

                {q?.answerInstructions && (
                  <Typography sx={{ fontSize: '0.8rem' }}>{q?.answerInstructions}</Typography>
                )}
              </QuestionContainer>

              {shouldRenderSubQuestions(q) && (
                <QuestionDetails>
                  {renderExpandableSection(q.id, 'example', q.example, 'Example')}
                  {renderExpandableSection(
                    q.id,
                    'notes',
                    q.notes,
                    `${q.isMultipleNotes === true ? 'Note 1 of 2' : 'Notes'}`
                  )}
                  {renderExpandableSection(q.id, 'notes2', q.notes2, 'Note 2 of 2')}
                  {renderExpandableSection(q.id, 'details', q.details, 'Details')}

                  {q?.subQuestions?.map((subQuestion, subIndex) => (
                    <SubQuestionDiv
                      key={subIndex}
                      style={{
                        display: subQuestion.isCheckbox || subQuestion.isRadio ? 'flex' : 'block',
                        justifyContent: 'space-between'
                      }}
                    >
                      <SubQuestion>{subQuestion.text}</SubQuestion>
                      {subQuestion.isCheckbox ? (
                        <YesNoSelector
                          onSelect={(option: string) =>
                            handleSubInputChange(q.id, `sub_${subIndex}`, option)
                          }
                          selectedOption={answer?.subAnswers?.[`sub_${subIndex}`] || ''}
                        />
                      ) : subQuestion.isRadio ? (
                        <Radio />
                      ) : (
                        <FieldInput
                          name="sub"
                          value={answer?.subAnswers?.[`sub_${subIndex}`] || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSubInputChange(q.id, `sub_${subIndex}`, e.target.value)
                          }
                          placeholder=""
                        />
                      )}
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
      <CustomModal
        openValue={isClearAllModal}
        closeFunction={() => setIsClearAllModal(false)}
        closedIcon={true}
        modalWidth={'25rem'}
      >
        <Box sx={{ marginTop: '1rem' }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Are you sure?</Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            This will delete all your responses for this section
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              columnGap: '0.5rem',
              marginTop: '1rem'
            }}
          >
            <ButtonWitnLoading
              text="Cancel"
              handleClick={() => setIsClearAllModal(false)}
              bg="black"
            />
            <ButtonWitnLoading text="Clear" handleClick={handleClearAll} />
          </Box>
        </Box>
      </CustomModal>
    </form>
  );
};

export default QuestionSection;
