import { Box, Radio, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import React, { useEffect, useState } from 'react';

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
import { AnswerData, IQuestionSection } from '@/store/app/types';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import NoContainer from '../../websites/SignContainer/noContainer';
import SignContainer from '../../websites/SignContainer';
import CustomModal from '@/components/core/Modal';
import DeleteModal from '@/components/core/DragAndDropUploadFile/DeleteModal';

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
const QuestionSection = ({
  questions,
  answers,
  setAnswers,
  fieldData,
  formik
}: IQuestionSection) => {
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
  const [visibleQuestions, setVisibleQuestions] = useState<number[]>([questions[0].id]);

  // Function to check if we should show the next question
  const shouldShowNextQuestion = (currentQuestionId: number) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex === -1 || currentIndex === questions.length - 1) return false;

    const currentAnswer = answers.find((a) => a.id === currentQuestionId);
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);

    // Check if mainAnswer exists and is not equal to the question's note
    return (
      (currentAnswer?.mainAnswer && currentQuestion?.note !== currentAnswer?.mainAnswer) ||
      currentAnswer?.isUpdated !== undefined
    );
  };

  // Function to add the next question to visible questions
  const handleShowNextQuestion = (currentQuestionId: number) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex === -1 || currentIndex === questions.length - 1) return;

    const nextQuestionId = questions[currentIndex + 1].id;
    if (!visibleQuestions.includes(nextQuestionId)) {
      setVisibleQuestions([...visibleQuestions, nextQuestionId]);
    }
  };
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
    if (subKey === 'isUpdated' && value) {
      handleShowNextQuestion(questionId);
    }
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
  useEffect(() => {
    questions.forEach((q) => {
      if (visibleQuestions.includes(q.id) && shouldShowNextQuestion(q.id)) {
        handleShowNextQuestion(q.id);
      }
    });
  }, [answers]);
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
  const handleReviewComplete = () => {
    // localStorage.setItem('reviewAnswers', JSON.stringify(values));
    openSignContainer();
  };

  return (
    <Box>
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
          if (!visibleQuestions.includes(q.id)) return null;
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
              <Box>
                {renderExpandableSection(q.id, 'example', q.example, 'Example')}
                {renderExpandableSection(
                  q.id,
                  'notes',
                  q.notes,
                  `${q.isMultipleNotes === true ? 'Note 1 of 2' : 'Notes'}`
                )}
                {renderExpandableSection(q.id, 'notes2', q.notes2, 'Note 2 of 2')}
                {renderExpandableSection(q.id, 'details', q.details, 'Details')}
              </Box>
              {shouldRenderSubQuestions(q) && (
                <QuestionDetails>
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
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        fontWeight: 'bold',
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
          <ButtonWitnLoading
            type="button"
            text="Complete Review"
            handleClick={handleReviewComplete}
          />
        </ButtonRow>
      </Container>
      {answers.filter((ans) => ans.isUpdated === 'No').length > 0 &&
        isSignInOpen &&
        answers.length === questions.length && <NoContainer />}
      {answers.filter((ans) => ans.isUpdated === 'No').length === 0 &&
        isSignInOpen &&
        answers.length === questions.length && (
          <SignContainer
            answers={answers}
            fieldData={fieldData}
            formik={formik}
            questions={questions}
          />
        )}

      <CustomModal
        openValue={isClearAllModal}
        closeFunction={() => setIsClearAllModal(false)}
        closedIcon={true}
        modalWidth={'25rem'}
      >
        <DeleteModal
          handleClickClearAll={handleClearAll}
          mainText="Are you sure?"
          subText="This will delete all your responses for this section."
          setIsClearModal={setIsClearAllModal}
          submitBtnText="Clear"
        />
      </CustomModal>
    </Box>
  );
};

export default QuestionSection;
