import { Box, Radio, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import React, {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState
} from 'react';

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
  ButtonRow,
  QuestionContainer
} from '../../index.styles';

import FieldInput from '@/components/core/FieldInput';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import YesNoSelector from '../../YesNoSelector';
import { Answer, IQuestionSection, Question, SubAnswers } from '@/store/app/types';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import NoContainer from '../../websites/SignContainer/noContainer';
import SignContainer from '../../websites/SignContainer';
import CustomModal from '@/components/core/Modal';
import DeleteModal from '@/components/core/DragAndDropUploadFile/DeleteModal';
import { useDispatch } from 'react-redux';
import { removeFile, setFiles } from '@/store/app/appSlice';
import { useAppSelector } from '@/hooks/useReduxTypedHooks';
import { getAppDataSelector } from '@/store/app';
type exampleOptions =
  | 'html_example_text'
  | 'html_note_text_1'
  | 'html_details_text'
  | 'html_note_text_2';
// Add this interface at the top of your file
interface DisclosureModalData {
  title: string;
  content: string;
}

interface ProcessedQuestion extends Question {
  // id: number;
  // content: string;
  modal?: DisclosureModalData;
  noteModal?: DisclosureModalData;
}
interface ModalList {
  list: {
    id: number;
    isQuestion: boolean;
    isNote: boolean;
  }[];
  modals: {
    [key: number]: {
      content?: React.ReactNode; // For question content
      noteContent?: React.ReactNode; // For note content
      title: string;
    };
  };
}
// Add this utility function outside your component
const processQuestionsWithDisclosures = (
  questions: ProcessedQuestion[],
  modalList: ModalList
): Question[] => {
  return questions.map((question) => {
    // Find if this question needs processing
    const modalConfig = modalList.list.find((item) => item.id === question.id);

    // If no processing needed, return as-is
    if (!modalConfig) return question;

    // Create a deep clone of the question to avoid modifying the original
    const processedQuestion = { ...question };
    const modalData = modalList.modals[question.id];

    // Process question text if needed
    if (modalConfig.isQuestion && modalData?.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = question.html_question_text || '';
      const uTags = tempDiv.getElementsByTagName('u');

      if (uTags.length > 0) {
        Array.from(uTags).forEach((uTag) => {
          const clickableSpan = document.createElement('span');
          clickableSpan.className = 'clickable-disclosure question';
          clickableSpan.style.cssText = 'cursor: pointer; text-decoration: underline;';
          clickableSpan.textContent = uTag.textContent;
          clickableSpan.dataset.questionId = question.id.toString();
          uTag.replaceWith(clickableSpan);
        });

        processedQuestion.html_question_text = tempDiv.innerHTML;
        processedQuestion.modal = {
          title: modalData.title,
          content: modalData.content as string
        };
      }
    }

    // Process note text if needed
    if (modalConfig.isNote && modalData?.noteContent) {
      const tempDiv = document.createElement('div');
      const noteText =
        typeof question.html_note_text_1 === 'string' ? question.html_note_text_1 : '';
      tempDiv.innerHTML = noteText;
      const uTags = tempDiv.getElementsByTagName('u');

      if (uTags.length > 0) {
        Array.from(uTags).forEach((uTag) => {
          const clickableSpan = document.createElement('span');
          clickableSpan.className = 'clickable-disclosure note';
          clickableSpan.style.cssText = 'cursor: pointer; text-decoration: underline;';
          clickableSpan.textContent = uTag.textContent;
          clickableSpan.dataset.questionId = question.id.toString();
          clickableSpan.dataset.isNote = 'true';
          uTag.replaceWith(clickableSpan);
        });

        processedQuestion.html_note_text_1 = tempDiv.innerHTML;
        processedQuestion.noteModal = {
          title: modalData.title,
          content: modalData.noteContent as string
        };
      }
    }

    return processedQuestion;
  });
};

const QuestionSection = ({
  questions,
  answers,
  setAnswers,
  fieldData,
  formik,
  modalList
}: IQuestionSection) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: {
      html_example_text?: boolean;
      html_note_text_1?: boolean;
      html_details_text?: boolean;
      html_note_text_2?: boolean;
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
  const [disclosureModalOpen, setDisclosureModalOpen] = useState(false);
  const [currentDisclosureModal, setCurrentDisclosureModal] = useState<
    DisclosureModalData | null | undefined
  >(null);
  const [processedQuestions, setProcessedQuestions] = useState<ProcessedQuestion[]>([]);

  // Add this click handler function
  const handleDisclosureClick = (questionId: number, isNote: boolean = false) => {
    const question = processedQuestions.find((q) => q.id === questionId);
    if (question) {
      setCurrentDisclosureModal(isNote ? question.noteModal : question.modal);
      setDisclosureModalOpen(true);
    }
  };

  // Add this useEffect to handle click events on disclosures
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('clickable-disclosure')) {
        const questionId = target.dataset.questionId;
        const isNote = target.dataset.isNote === 'true';

        if (questionId) {
          handleDisclosureClick(parseInt(questionId), isNote);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [questions, processedQuestions]);

  // Process your questions before rendering (add this near the top of your component)

  useEffect(() => {
    // Process questions when they change
    const withDisclosures = processQuestionsWithDisclosures(
      questions,
      modalList // Pass the entire modalList object
    );
    setProcessedQuestions(withDisclosures);
    console.log('withDisclosures', withDisclosures);
  }, [questions, modalList]); // Add modalList to dependencies
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isClearAllModal, setIsClearAllModal] = useState<boolean>(false);
  // const [visibleQuestions, setVisibleQuestions] = useState<number[]>([questions[0].id]);
  const [visibleQuestions, setVisibleQuestions] = useState<number[]>([questions[0].id]);

  const [isCompleteAllModal, setIsCompleteAllModal] = useState<boolean>(false);
  const { tabFiles } = useAppSelector(getAppDataSelector);
  console.log('processedQuestions', processedQuestions);

  const dispatch = useDispatch();

  // Function to check if we should show the next question
  const shouldShowNextQuestion = (currentQuestionId: number) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex === -1 || currentIndex === questions.length - 1) return false;

    const currentAnswer = answers.find((a) => a.id === currentQuestionId);
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);

    // Check if mainAnswer exists and is not equal to the question's note

    return (
      (currentAnswer?.mainAnswer &&
        currentQuestion?.show_subquestions.toUpperCase() !==
          currentAnswer?.mainAnswer.toUpperCase()) ||
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
    if (question.show_subquestions === 'YES' && selected === 'Yes') {
      return true;
    }
    if (question.show_subquestions === 'NO' && selected === 'No') {
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

  // Add this import at the top of your file

  // Inside your component, get the dispatch function

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
  const toggleSection = (id: number, section: exampleOptions) => {
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
    type: 'html_example_text' | 'html_note_text_1' | 'html_details_text' | 'html_note_text_2',
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
        {expandedSections[id][type] && (
          <Typography dangerouslySetInnerHTML={{ __html: content }} sx={{ marginTop: '0.1rem' }} />
        )}
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
  // Update your handleFileUpload function
  const handleFileUpload = (questionId: number, file: string | File) => {
    // Update local state
    // setAnswers((prev: Answer[]) => {
    //   const existingAnswerIndex = prev.findIndex((a) => a.id === questionId);

    //   if (existingAnswerIndex >= 0) {
    //     const updatedAnswers = [...prev];
    //     updatedAnswers[existingAnswerIndex] = {
    //       ...updatedAnswers[existingAnswerIndex],
    //       fileUpload: file
    //     };

    //     return updatedAnswers;
    //   } else {
    //     return [
    //       ...prev,
    //       {
    //         id: questionId,
    //         fileUpload: file,
    //         fileType:'SubQuestion',
    //       }
    //     ];
    //   }
    // });

    // Dispatch to Redux store
    dispatch(
      setFiles({
        questionId,
        file,
        fileType: 'SubQuestion'
      })
    );

    setIsSignInOpen(false);
  };
  const handleFileDelete = (questionId: number) => {
    // Update local state
    setAnswers((prev: Answer[]) => {
      const existingAnswerIndex = prev.findIndex((a) => a.id === questionId);

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          fileUpload: undefined
        };

        return updatedAnswers;
      }

      return prev;
    });

    // Dispatch to Redux store
    dispatch(removeFile({ questionId }));
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
        {processedQuestions.map((q, index) => {
          if (!visibleQuestions.includes(q.id)) return null;
          const answer = getAnswer(q.id);

          return (
            <QuestionWrapper key={q.id} style={{ marginBottom: '1.4rem' }}>
              <QuestionContainer>
                <QuestionDiv>
                  {/* <Question>
                    {index + 1}. {q.question}
                  </Question> */}
                  <Box sx={{ display: 'flex', alignItems: 'start', columnGap: '0.2rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {q.display_order}.
                    </span>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: q.html_question_text }}
                      sx={{ marginTop: '0.02rem' }}
                    />
                  </Box>
                  {q.is_na === true ? (
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

                {q?.html_instructions_text && (
                  <Typography
                    dangerouslySetInnerHTML={{ __html: q.html_instructions_text }}
                    sx={{ marginTop: '0.1rem' }}
                  />
                )}
              </QuestionContainer>
              <Box>
                {renderExpandableSection(q.id, 'html_example_text', q.html_example_text, 'Example')}
                {renderExpandableSection(
                  q.id,
                  'html_note_text_1',
                  q.html_note_text_1,
                  `${q.html_note_text_1 && q.html_note_text_2 ? 'Note 1 of 2' : 'Notes'}`
                )}
                {renderExpandableSection(
                  q.id,
                  'html_note_text_2',
                  q.html_note_text_2,
                  'Note 2 of 2'
                )}
                {renderExpandableSection(q.id, 'html_details_text', q.html_details_text, 'Details')}
              </Box>
              {shouldRenderSubQuestions(q) && (
                <QuestionDetails>
                  {q?.subquestions
                    // ?.filter((question) => question.question_type === 'SIMPLE')
                    .map((subQuestion, subIndex) => (
                      <>
                        <SubQuestionDiv
                          key={subIndex}
                          style={{
                            display:
                              subQuestion.field_type === 'CHECKBOX' ||
                              subQuestion.field_type === 'Radio'
                                ? 'flex'
                                : 'block',
                            justifyContent: 'space-between'
                          }}
                        >
                          {/* <SubQuestion>{subQuestion.text}</SubQuestion> */}
                          <Typography
                            dangerouslySetInnerHTML={{ __html: subQuestion.html_sub_question_text }}
                            // sx={{ marginTop: '0.1rem' }}
                          />
                          {subQuestion.field_type === 'CHECKBOX' &&
                          subQuestion.question_type === 'SIMPLE' ? (
                            <YesNoSelector
                              onSelect={(option: string) => {
                                handleSubInputChange(q.id, `sub_${subQuestion.id}`, option);
                              }}
                              selectedOption={answer?.subAnswers?.[`sub_${subQuestion.id}`] || ''}
                            />
                          ) : subQuestion.field_type === 'CHECKBOX' &&
                            subQuestion.question_type === 'SPECIAL' ? (
                            <YesNoSelector
                              onSelect={(option: string) => {
                                handleSubInputChange(q.id, `sub_${subQuestion.id}`, option);
                                handleInputChange(q.id, 'isUpdated', option);
                                console.log('clicked SPECIAL');
                              }}
                              selectedOption={answer?.subAnswers?.[`sub_${subQuestion.id}`] || ''}
                            />
                          ) : subQuestion.field_type === 'Radio' &&
                            subQuestion.question_type === 'SIMPLE' ? (
                            <Radio
                              onChange={(e) =>
                                handleSubInputChange(q.id, `sub_${subQuestion.id}`, e.target.value)
                              }
                              name="sub"
                              sx={{
                                accentColor: COLORS.BLUE_600,
                                '&.Mui-checked': {
                                  color: COLORS.BLUE_600 // Checked color
                                }
                              }}
                            />
                          ) : subQuestion.field_type === 'FILE' &&
                            subQuestion.question_type === 'SIMPLE' ? (
                            <SubQuestionDiv>
                              {/* <SubQuestion>{q.dragAndDrop}</SubQuestion> */}
                              <FileUpload
                                formik={formik}
                                isDelete
                                name={`upload_${q.id}`}
                                onUpload={(file) => handleFileUpload(q.id, file)}
                                onDelete={() => handleFileDelete(q.id)}
                              />
                            </SubQuestionDiv>
                          ) : (
                            <FieldInput
                              name="sub"
                              value={answer?.subAnswers?.[`sub_${subQuestion.id}`] || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleSubInputChange(q.id, `sub_${subQuestion.id}`, e.target.value)
                              }
                              placeholder=""
                            />
                          )}
                        </SubQuestionDiv>
                        {subQuestion.question_type === 'SPECIAL' &&
                          answer?.subAnswers?.[`sub_${subQuestion.id}`] && (
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                marginBottom: '1rem',
                                fontWeight: 'bold',
                                color:
                                  answer?.subAnswers?.[`sub_${subQuestion.id}`] === 'Yes'
                                    ? 'green'
                                    : 'red'
                              }}
                            >
                              {answer?.subAnswers?.[`sub_${subQuestion.id}`] === 'Yes'
                                ? subQuestion.yes_text
                                : subQuestion.no_text}
                            </Typography>
                          )}
                      </>
                    ))}

                  {q.dragAndDrop && (
                    <SubQuestionDiv>
                      <SubQuestion>{q.dragAndDrop}</SubQuestion>
                      <FileUpload formik={formik} isDelete name={`upload_${q.id}`} />
                    </SubQuestionDiv>
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
      <CustomModal
        openValue={disclosureModalOpen}
        closeFunction={() => setDisclosureModalOpen(false)}
        closedIcon={true}
        modalWidth={'25rem'}
      >
        {currentDisclosureModal && (
          <Box>
            <Typography sx={{ fontSize: '0.9rem' }}>{currentDisclosureModal.content}</Typography>
          </Box>
        )}
      </CustomModal>
    </Box>
  );
};

export default QuestionSection;
