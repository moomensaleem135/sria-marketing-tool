import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import { Formik, Form, Field } from 'formik';

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
  BoldUnderline,
  QuestionContainer,
  Note,
  BoldText
} from './index.styles';

import FieldInput from '@/components/core/FieldInput';
import Button from '@/components/core/Button';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import YesNoSelector from '../../YesNoSelector';
import CustomModal from '@/components/core/Modal';
import QuestionDetailModal from '../QuestionDetailModal';
import QuestionDetailModal2 from '../QuestionDetailModal2';

interface Question {
  id: number;
  question: string;
  details?: string;
  subQuestions: string[];
  dragAndDrop?: string;
  isUpdated?: string;
  note?: string;
}

interface Props {
  questions: Question[];
  openSignContainer: () => void;
}

const QuestionSection: React.FC<Props> = ({ questions, openSignContainer }) => {
  const [exampleSwitch, setExampleSwitch] = useState<{ [key: number]: boolean }>({});
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const handleOpenDetail = () => {
    setOpenDetail(true);
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
      acc[`details${q.id}`] = q.details || '';
      q.subQuestions.forEach((_, index) => {
        acc[`subQuestion_${q.id}_${index}`] = '';
      });
      acc[`upload_${q.id}`] = '';
      acc[`isUpdated_${q.id}`] = '';
      acc[`option_${q.id}`] = '';

      return acc;
    },
    {} as { [key: string]: string }
  );

  const handleSubmit = (values: { [key: string]: string }) => {
    localStorage.setItem('reviewAnswers', JSON.stringify(values));
    openSignContainer();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Container>
            <QuestionsHeading>{questions.length} Questions</QuestionsHeading>
            <Line />
            {questions.map((q, index) => (
              <QuestionWrapper key={q.id}>
                <QuestionContainer>
                  <QuestionDiv>
                    <Question>
                      {index + 1}. {q.question}
                    </Question>
                    <YesNoSelector
                      onSelect={(option: string) => {
                        formik.setFieldValue(`option_${q.id}`, option);
                        handleSelectedYesNo(q.id, option);
                      }}
                      selectedOption={() => {}}
                    />
                  </QuestionDiv>
                  {q.note && index + 1 < questions.length && (
                    <Note>
                      {q.note === 'Yes' ? (
                        <>
                          <BoldText>Note: If yes,</BoldText> complete form below.
                          <BoldText>If no, </BoldText>move on to question {index + 2}
                        </>
                      ) : (
                        <>
                          <BoldText>Note: If no,</BoldText> complete form below.
                          <BoldText>If yes, </BoldText>move on to question {index + 2}
                        </>
                      )}
                    </Note>
                  )}
                  {q.note && index === questions.length - 1 && (
                    <Note>
                      {q.note === 'Yes' ? (
                        <>
                          <BoldText>Note: If yes,</BoldText> complete form below.
                        </>
                      ) : (
                        <>
                          <BoldText>Note: If no,</BoldText> complete form below.
                        </>
                      )}
                    </Note>
                  )}
                </QuestionContainer>
                {shouldRenderSubQuestions(q) && (
                  <QuestionDetails>
                    <FlexRow>
                      <IconButton
                        onClick={() => toggleExample(q.id)}
                        sx={{ color: `${COLORS.BLUE_TEXT}`, padding: '0px' }}
                      >
                        {exampleSwitch[q.id] ? (
                          <Add sx={{ padding: ' 3px' }} />
                        ) : (
                          <Remove sx={{ padding: ' 3px' }} />
                        )}
                        <TextBlue>Detail</TextBlue>
                      </IconButton>
                    </FlexRow>

                    {!exampleSwitch[q.id] && (
                      <Example>
                        The SEC requires each disclosure to state if the person giving the
                        testimonial is a current or former client.
                        <BoldUnderline onClick={handleOpenDetail}>Click Here</BoldUnderline>
                        for a good example.
                      </Example>
                    )}

                    {q.subQuestions.map((subQuestion, subIndex) => (
                      <SubQuestionDiv key={subIndex}>
                        <SubQuestion>{subQuestion}</SubQuestion>
                        <Field
                          name={`subQuestion_${q.id}_${subIndex}`}
                          as={FieldInput}
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
                        <Question>{q.isUpdated}</Question>
                        <YesNoSelector
                          onSelect={(option: string) =>
                            formik.setFieldValue(`isUpdated_${q.id}`, option)
                          }
                          selectedOption={() => {}}
                        />
                      </IsUpdatedDiv>
                    )}
                  </QuestionDetails>
                )}
              </QuestionWrapper>
            ))}
            <Line />
            <ButtonRow>
              <Button type="submit">Complete Review</Button>
            </ButtonRow>
            <CustomModal
              openValue={openDetail}
              closeFunction={() => setOpenDetail(false)}
              mainHeading=""
              modalWidth={'60%'}
            >
              <QuestionDetailModal2 closeFunction={() => setOpenDetail(false)} />
              {/* <QuestionDetailModal 
                closeFunction={() => setOpenDetail(false)}
                /> */}
            </CustomModal>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionSection;
