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
  ButtonRow
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
  selectedOption: { [key: number]: string };
  handleSelectedYesNo: (questionID: number, option: string) => void;
  openSignContainer: () => void;
}

const QuestionSection: React.FC<Props> = ({
  questions,
  selectedOption,
  handleSelectedYesNo,
  openSignContainer
}) => {
  const [exampleSwitch, setExampleSwitch] = useState<{ [key: number]: boolean }>({});

  const toggleExample = (id: number) => {
    setExampleSwitch((prev) => ({
      ...prev,
      [id]: !prev[id]
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

      return acc;
    },
    {} as { [key: string]: string }
  );

  const handleSubmit = () => {
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
                  <YesNoSelector onSelect={(option: string) => handleSelectedYesNo(q.id, option)} />
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
                      </IconButton>
                      <TextBlue>Example</TextBlue>
                    </FlexRow>

                    {!exampleSwitch[q.id] && (
                      <Field
                        name={`example${q.id}`}
                        as={FieldInput}
                        readOnly
                        value={q.example}
                        customPadding="5px"
                        fontWeight="400"
                      />
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
                        <FileUpload formik={formik} name={`upload_${q.id}`} />
                      </SubQuestionDiv>
                    )}

                    {q.isUpdated && (
                      <IsUpdatedDiv>
                        <SubQuestion>{q.isUpdated}</SubQuestion>
                        <YesNoSelector
                          onSelect={(option: string) =>
                            formik.setFieldValue(`isUpdated_${q.id}`, option)
                          }
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

// import React, { useState } from 'react';
// import { IconButton } from '@mui/material';
// import { Add, Remove } from '@mui/icons-material';
// import { COLORS } from '@/constants/colors';
// import {
//     FlexRow,
//     Line,
//     QuestionDiv,
//     QuestionWrapper,
//     SubQuestionDiv,
//     SubQuestion,
//     TextBlue,
//     QuestionsHeading,
//     Container,
//     ButtonRightRow
// } from '../index.styles';
// import FieldInput from '@/components/core/FieldInput';
// import YesNoSelector from '../../YesNoSelector';
// import Button from '@/components/core/Button';
// import FileUpload from '@/components/core/DragAndDropUploadFile';

// interface Question {
//     id: number;
//     question: string;
//     example: string;
//     subQuestions: string[];
//     dragAndDrop?: string;
//     isUpdated?: string;
// }

// interface Props {
//     questions: Question[];
//     selectedOption: { [key: number]: string };
//     handleSelectedYesNo: (questionID: number, option: string) => void;
//     openSignContainer: () => void
// }

// const QuestionSection: React.FC<Props> = ({ questions, selectedOption, handleSelectedYesNo, openSignContainer }) => {
//     const [exampleSwitch, setExampleSwitch] = useState<{ [key: number]: boolean }>({});

//     const toggleExample = (id: number) => {
//         setExampleSwitch((prev) => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     return (
//         <Container>
//             <QuestionsHeading>{questions.length} Questions</QuestionsHeading>
//             <Line />
//             {questions.map((q, index) => (
//                 <QuestionWrapper key={q.id}>
//                     <QuestionDiv>
//                         <span>{index + 1}. {q.question}</span>
//                         <YesNoSelector onSelect={(option: string) => handleSelectedYesNo(q.id, option)} />
//                     </QuestionDiv>
//                     {selectedOption[q.id] === 'Yes' && (
//                         <>
//                             <FlexRow>
//                                 <IconButton
//                                     onClick={() => toggleExample(q.id)}
//                                     sx={{ color: `${COLORS.BLUE_TEXT}`, padding: '0px', marginRight: '5px' }}
//                                 >
//                                     {exampleSwitch[q.id] ? <Remove /> : <Add />}
//                                 </IconButton>
//                                 <TextBlue>Example</TextBlue>
//                             </FlexRow>

//                             {exampleSwitch[q.id] && (
//                                 <FieldInput name={`example${q.id}`} value={q.example} customPadding="5px" />
//                             )}

//                             {q.subQuestions.map((subQuestion, index) => (
//                                 <SubQuestionDiv key={index}>
//                                     <SubQuestion>{subQuestion}</SubQuestion>
//                                     <FieldInput name={`subQuestion_${q.id}_${index}`} />
//                                 </SubQuestionDiv>
//                             ))}

//                             {q.dragAndDrop && (
//                                 <SubQuestionDiv>
//                                     <SubQuestion>{q.dragAndDrop}</SubQuestion>
//                                     <FileUpload formik={formik} name={q.dragAndDrop} />
//                                 </SubQuestionDiv>
//                             )}

//                             {q.isUpdated && (
//                                 <div>
//                                     <SubQuestion>{q.isUpdated}</SubQuestion>
//                                     <YesNoSelector/>
//                                 <div/>
//                             )}
//                         </>
//                     )}
//                 </QuestionWrapper>
//             ))}
//             <Line />
//             <ButtonRightRow>
//                 <Button type='button' onClick={openSignContainer}>
//                     Complete Review
//                 </Button>
//             </ButtonRightRow>
//         </Container>
//     );
// };

// export default QuestionSection;
