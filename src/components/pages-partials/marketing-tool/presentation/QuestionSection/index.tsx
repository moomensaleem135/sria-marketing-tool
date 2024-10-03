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
  Example
} from './index.styles';

import FieldInput from '@/components/core/FieldInput';
import Button from '@/components/core/Button';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import YesNoSelector from '../../YesNoSelector';

interface Question {
  id: number;
  question: string;
  example: string;
  subQuestions: string[];
  dragAndDrop?: string;
  isUpdated?: string;
}

interface Props {
  questions: Question[];
  openSignContainer: () => void;
}

const QuestionSection: React.FC<Props> = ({ questions, openSignContainer }) => {
  const [exampleSwitch, setExampleSwitch] = useState<{ [key: number]: boolean }>({});
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});

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

  const initialValues = questions.reduce(
    (acc, q) => {
      acc[`example${q.id}`] = q.example || '';
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
                {selectedOption[q.id] === 'Yes' && (
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
                        <TextBlue>Example</TextBlue>
                      </IconButton>
                    </FlexRow>
                    {!exampleSwitch[q.id] && <Example>{q.example}</Example>}
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
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionSection;
