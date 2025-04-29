import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TopHeading } from '../index.styles';
import InitialForm from '../initialForm';
import QuestionSection from '../performance-advertising/QuestionSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import { Answer, FieldData, Question } from '@/store/app/types';
import { COLORS } from '@/constants/colors';
interface IMainComponent {
  fieldData: FieldData[];
  formInitialValues: any;
  questions: Question[];
  answers: Answer[];
  setAnswers: (value: Answer[] | ((prev: Answer[]) => Answer[])) => void;
  topHeading: string;
}
const MainComponentForm = ({
  fieldData,
  formInitialValues,
  questions,
  answers,
  setAnswers,
  topHeading
}: IMainComponent) => {
  const [isAllFieldModal, setIsAllFieldModal] = useState<boolean>(false);
  const [isAccordinanOpen, setIsAccordianOpen] = useState<boolean>(true);
  const [isBeginReview, setIsBeginReview] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values) => {
      const isFormValid = Object.values(values).every((value) => value !== '' && value != null);

      if (isFormValid) {
        setIsBeginReview(true);
      } else {
        setIsAllFieldModal(true);
      }
    }
  });
  useEffect(() => {
    if (isBeginReview) {
      setIsAccordianOpen(false);
    }
  }, [isBeginReview]);

  return (
    <Box>
      <TopHeading style={{ marginBottom: '1rem' }}>{topHeading}</TopHeading>
      {!isBeginReview ? (
        <Box sx={{ border: `1px solid ${COLORS.GREY_400}` }}>
          <InitialForm
            fieldsData={fieldData}
            formik={formik}
            isAllFieldModal={isAllFieldModal}
            setIsAllFieldModal={setIsAllFieldModal}
            isBeginReview={isBeginReview}
            //   setIsAccordianOpen={setIsAccordianOpen}
            //   isAccordinanOpen={isAccordinanOpen}
          />
        </Box>
      ) : (
        <Accordion
          expanded={isAccordinanOpen}
          onChange={() => setIsAccordianOpen(!isAccordinanOpen)}
          sx={{
            border: `1px solid ${COLORS.GREY_400}`,
            borderRadius: '10px !important'
            // height: '40px'
          }}
        >
          <AccordionSummary style={{ fontWeight: 'bold' }} expandIcon={<ExpandMoreIcon />}>
            {!isAccordinanOpen && `${topHeading} Details`}
          </AccordionSummary>
          <AccordionDetails>
            <InitialForm
              fieldsData={fieldData}
              formik={formik}
              isAllFieldModal={isAllFieldModal}
              setIsAllFieldModal={setIsAllFieldModal}
              isBeginReview={isBeginReview}
              //   setIsAccordianOpen={setIsAccordianOpen}
              //   isAccordinanOpen={isAccordinanOpen}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {isBeginReview && (
        <Box sx={{ marginTop: '1rem' }}>
          <QuestionSection
            questions={questions}
            answers={answers}
            setAnswers={setAnswers}
            fieldData={fieldData}
            formik={formik}
          />
        </Box>
      )}
    </Box>
  );
};

export default MainComponentForm;
