'use client';

import React, { useState } from 'react';

import { Answer } from '@/store/app/types';
import { questions } from '../websites';
import MainComponentForm from '../main-component';

const fieldData = [
  {
    id: 1,
    name: 'presentation_name',
    fieldTitle: 'Name of Presentation:',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 2,
    name: 'advisor',
    fieldTitle: 'Advisor(s)',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 3,
    name: 'date',
    fieldTitle: 'Review Date:',
    type: 'date',
    isFileUpload: false,
    columnSize: 2
  },
  {
    id: 4,
    name: 'audience',
    fieldTitle: 'Intended Audience:',
    type: 'text',
    isFileUpload: false,
    columnSize: 12
  },
  {
    id: 5,
    name: 'upload',
    fieldTitle: 'Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):',
    type: 'upload',
    isFileUpload: true,
    columnSize: 12
  }
];

const PartialPresentation = () => {
  const [presentationAnswers, setPresentationAnswers] = useState<Answer[]>([]);
  const initialValues = {
    presentation_name: '',
    advisor: '',
    date: '',
    audience: '',
    upload: ''
  };
  // const formik = useFormik({
  //   initialValues: {
  //     presentation_name: '',
  //     advisor: '',
  //     date: '',
  //     audience: '',
  //     upload: ''
  //   },
  //   onSubmit: (values) => {
  //     if (
  //       values.presentation_name !== '' &&
  //       values.advisor !== '' &&
  //       values.date !== '' &&
  //       values.audience !== '' &&
  //       values.upload !== ''
  //     ) {
  //       setIsBeginReview(true);
  //     } else {
  //       setIsAllFieldModal(true);
  //     }
  //   }
  // });
  // useEffect(() => {
  //   if (isBeginReview) {
  //     setIsAccordianOpen(false);
  //   }
  // }, [isBeginReview]);

  return (
    // <Box>
    //   <TopHeading>Presentations</TopHeading>
    //   <Accordion expanded={isAccordinanOpen} onChange={()=>setIsAccordianOpen(!isAccordinanOpen)}>
    //     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //       Presentation Details
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <InitialForm
    //         fieldsData={fieldData}
    //         formik={formik}
    //         isAllFieldModal={isAllFieldModal}
    //         setIsAllFieldModal={setIsAllFieldModal}
    //       />
    //     </AccordionDetails>
    //   </Accordion>
    //   {isBeginReview && (
    //     <Box sx={{ marginTop: '1rem' }}>
    //       <QuestionSection
    //         questions={questions}
    //         answers={presentationAnswers}
    //         setAnswers={setPresentationAnswers}
    //         fieldData={fieldData}
    //         formik={formik}
    //       />
    //     </Box>
    //   )}
    // </Box>
    <MainComponentForm
      answers={presentationAnswers}
      setAnswers={setPresentationAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Presentations'}
    />
  );
};

export default PartialPresentation;
