import { Box, Typography } from '@mui/material';
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
  Example
} from '../../index.styles';

import FieldInput from '@/components/core/FieldInput';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import YesNoSelector from '../../YesNoSelector';
import { Answer, IQuestionSection } from '@/store/app/types';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import NoContainer from '../SignContainer/noContainer';
import SignContainer from '../SignContainer';
import CustomModal from '@/components/core/Modal';
import DeleteModal from '@/components/core/DragAndDropUploadFile/DeleteModal';

const QuestionSection = ({
  questions,
  answers,
  setAnswers,
  fieldData,
  formik
}: IQuestionSection) => {
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
  const [isClearAllModal, setIsClearAllModal] = useState<boolean>(false);
  const [visibleQuestions, setVisibleQuestions] = useState<number[]>([questions[0].id]);
  // console.log('answer', answers,'fieldData',fieldData);
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

  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     localStorage.setItem('reviewAnswers', JSON.stringify(values));
  //     openSignContainer();
  //   }
  // });

  const handleInputChange = (questionId: number, field: string, value: string) => {
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
    if (field === 'isUpdated' && value) {
      handleShowNextQuestion(questionId);
    }
    setIsSignInOpen(false);
  };
  useEffect(() => {
    questions.forEach((q) => {
      if (visibleQuestions.includes(q.id) && shouldShowNextQuestion(q.id)) {
        handleShowNextQuestion(q.id);
      }
    });
  }, [answers]);

  const handleSubInputChange = (questionId: number, subKey: string, value: string) => {
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
  const handleClearAll = () => {
    setAnswers([]);
    setIsClearAllModal(false);
  };

  return (
    <form onSubmit={() => {}}>
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
              <Box>
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
              </Box>
              <Box sx={{ padding: '2px 0 7px 0' }}>
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
              </Box>
              {shouldRenderSubQuestions(q) && (
                <QuestionDetails>
                  {q?.subQuestions?.map((subQuestion, subIndex) => (
                    <SubQuestionDiv key={subIndex}>
                      <SubQuestion>{subQuestion.text}</SubQuestion>
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
                  <Box sx={{ marginBottom: '1.4rem' }}>
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
                  </Box>
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
        answers.length === questions.length && (
          <SignContainer
            answers={answers}
            questions={questions}
            fieldData={fieldData}
            formik={formik}
          />
        )}

      <CustomModal
        openValue={isClearAllModal}
        closeFunction={() => setIsClearAllModal(false)}
        closedIcon={true}
        modalWidth={'30rem'}
        mainHeading="Clear Responses?"
      >
        <DeleteModal
          handleClickClearAll={handleClearAll}
          mainText="Are you sure?"
          subText="This will delete all your responses for this section."
          setIsClearModal={setIsClearAllModal}
          submitBtnText="Clear"
        />
      </CustomModal>
    </form>
  );
};

export default QuestionSection;
