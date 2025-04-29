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
import { Answer, IQuestionSection, SubAnswers } from '@/store/app/types';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import NoContainer from '../../websites/SignContainer/noContainer';
import SignContainer from '../../websites/SignContainer';
import CustomModal from '@/components/core/Modal';
import DeleteModal from '@/components/core/DragAndDropUploadFile/DeleteModal';

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
  const [isCompleteAllModal, setIsCompleteAllModal] = useState<boolean>(false);
  console.log('answer', answers);
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
    const currentAnswer = getAnswer(questionID);

    // If clicking the already selected option, unselect it
    if (currentAnswer?.mainAnswer === option) {
      setSelectedOption((prev) => {
        const newState = { ...prev };
        delete newState[questionID];

        return newState;
      });

      // Remove the answer
      const updatedAnswers = answers.filter((a: Answer) => a.id !== questionID);
      setAnswers(updatedAnswers);

      // Hide subsequent questions
      setVisibleQuestions((prev) => {
        const currentIndex = questions.findIndex((q) => q.id === questionID);

        return prev.filter((id) => {
          const questionIndex = questions.findIndex((q) => q.id === id);

          return questionIndex <= currentIndex;
        });
      });
    } else {
      // Otherwise, select the new option
      setSelectedOption((prev) => ({
        ...prev,
        [questionID]: option
      }));
    }
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
    const currentAnswer = getAnswer(questionId);

    // If the value is the same as current answer, remove the answer
    if (currentAnswer?.[field as keyof Answer] === value) {
      setAnswers((prev) => {
        const newAnswers = prev.filter((a) => a.id !== questionId);
        // If we're removing isUpdated but mainAnswer exists, keep the answer with just mainAnswer
        if (field === 'isUpdated' && currentAnswer?.mainAnswer) {
          return [...newAnswers, { id: questionId, mainAnswer: currentAnswer.mainAnswer }];
        }

        return newAnswers;
      });

      // Hide subsequent questions only if it's the main answer being removed
      if (field === 'mainAnswer') {
        setVisibleQuestions((prev) => {
          const currentIndex = questions.findIndex((q) => q.id === questionId);

          return prev.filter((id) => {
            const questionIndex = questions.findIndex((q) => q.id === id);

            return questionIndex <= currentIndex;
          });
        });
      }

      return;
    }

    // Otherwise, update the answer
    setAnswers((prev: Answer[]) => {
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

    // If updating isUpdated to "Yes", show next question
    if (field === 'isUpdated' && value === 'Yes') {
      handleShowNextQuestion(questionId);
    }

    setIsSignInOpen(false);
  };

  const handleSubInputChange = (questionId: number, subKey: keyof SubAnswers, value: string) => {
    const currentSubAnswer = getAnswer(questionId)?.subAnswers?.[subKey];

    // If clicking the same option, unset it
    if (currentSubAnswer === value) {
      setAnswers((prev: Answer[]) => {
        const existingAnswerIndex = prev.findIndex((a) => a.id === questionId);

        if (existingAnswerIndex >= 0) {
          const updatedAnswers = [...prev];
          const existingSubAnswers = updatedAnswers[existingAnswerIndex].subAnswers || {};

          // Remove the specific subAnswer
          const newSubAnswers = { ...existingSubAnswers };
          delete newSubAnswers[subKey];

          updatedAnswers[existingAnswerIndex] = {
            ...updatedAnswers[existingAnswerIndex],
            subAnswers: Object.keys(newSubAnswers).length > 0 ? newSubAnswers : undefined
          };

          // If no subAnswers left and no other fields, remove the entire answer
          if (
            Object.keys(newSubAnswers).length === 0 &&
            !updatedAnswers[existingAnswerIndex].mainAnswer &&
            !updatedAnswers[existingAnswerIndex].isUpdated &&
            !updatedAnswers[existingAnswerIndex].fileUpload
          ) {
            return prev.filter((a) => a.id !== questionId);
          }

          return updatedAnswers;
        }

        return prev;
      });
    } else {
      // Otherwise, update the subAnswer normally
      setAnswers((prev: Answer[]) => {
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
    }

    if (subKey === 'isUpdated' && value) {
      handleShowNextQuestion(questionId);
    }
    setIsSignInOpen(false);
  };

  const handleFileUpload = (questionId: number, file: string) => {
    setAnswers((prev: Answer[]) => {
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

  const checkAnswerData = () => {
    const data = answers.filter((ans, index) => {
      const question = questions[index];

      return (
        ans.mainAnswer === question.note && !ans.isUpdated // Checks for empty/undefined
      );
    });

    return data;
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
    const isAllAnswered = checkAnswerData();
    if (isAllAnswered.length > 0) {
      setIsCompleteAllModal(true);
    } else if (isAllAnswered.length === 0 && answers.length === questions.length) {
      openSignContainer();
    }
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
            <QuestionWrapper key={q.id} style={{ marginBottom: '1.4rem' }}>
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
                        <Radio
                          onChange={(e) =>
                            handleSubInputChange(q.id, `sub_${subIndex}`, e.target.value)
                          }
                          name="sub"
                          sx={{
                            accentColor: COLORS.BLUE_600,
                            '&.Mui-checked': {
                              color: COLORS.BLUE_600 // Checked color
                            }
                          }}
                        />
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
            disable={answers.length !== questions.length}
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
      <CustomModal
        openValue={isCompleteAllModal}
        closeFunction={() => setIsCompleteAllModal(false)}
        closedIcon={true}
        modalWidth={'25rem'}
      >
        <Box>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            Review not completed.
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>Please answer all required questions</Typography>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default QuestionSection;
