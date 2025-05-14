import CustomInputField from '@/components/core/FormikCustomInput';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { ButtonRightRow, Label } from '../blogs-article/index.styles';
import DatePickerWithIcon from '@/components/core/DatePickerTask';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import CustomModal from '@/components/core/Modal';
import { COLORS } from '@/constants/colors';
import Image from 'next/image';
import { Answer } from '@/store/app/types';
import { removeFile, setFiles } from '@/store/app/appSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useReduxTypedHooks';
import { getAppDataSelector } from '@/store/app';

interface FormField {
  id: number;
  name: string;
  fieldTitle: string;
  type: string; // Add other possible types if needed
  isFileUpload: boolean;
  columnSize: number; // Assuming this is between 1-12 (like grid systems)
}
interface IInitialForm {
  fieldsData: FormField[];
  formik: any;
  isAllFieldModal: boolean;
  setIsAllFieldModal: (value: boolean) => void;
  // setIsAccordianOpen: any;
  // isAccordinanOpen: any;
  isBeginReview: boolean;
  setAnswers: (value: Answer[] | ((prev: Answer[]) => Answer[])) => void;
}
const InitialForm = ({
  fieldsData,
  formik,
  isAllFieldModal,
  setIsAllFieldModal,
  isBeginReview,
  setAnswers
  // setIsAccordianOpen,
  // isAccordinanOpen
}: IInitialForm) => {
  // console.log('isAccordinanOpen',isAccordinanOpen)
  const { tabFiles } = useAppSelector(getAppDataSelector);
  console.log('tabFiles', tabFiles);
  const dispatch = useDispatch();
  const handleFileUpload = (questionId: number, file: File) => {
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
    //         fileType:'form',
    //         fileUpload: file
    //       }
    //     ];
    //   }
    // });

    // Dispatch to Redux store
    dispatch(
      setFiles({
        questionId,
        file,
        fileType: 'form'
      })
    );
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
    <form style={{ padding: '1.5rem ', borderRadius: '10px' }} onSubmit={formik.handleSubmit}>
      <Grid
        container
        display={'flex'}
        direction={'row'}
        columnSpacing={2}
        rowSpacing={4}
        sx={{ marginTop: isBeginReview ? '-4rem' : '-1rem' }}
      >
        {fieldsData.map((data) => (
          <Grid item md={data.columnSize} key={data.id}>
            <Label> {data.fieldTitle}</Label>
            {data.type === 'text' && (
              <CustomInputField name={data.name} type={'text'} formik={formik} />
            )}
            {data.type === 'date' && <DatePickerWithIcon formik={formik} name={data.name} />}
            {data.type === 'upload' && data.isFileUpload === true && (
              <FileUpload
                formik={formik}
                isDelete
                name={data.name}
                onUpload={(file) => handleFileUpload(0, file)}
                onDelete={() => handleFileDelete(0)}
              />
            )}
          </Grid>
        ))}
      </Grid>
      {/* <SignContainer/> */}
      <ButtonRightRow>
        <ButtonWitnLoading type="submit" text="Click to Begin" />
      </ButtonRightRow>
      <CustomModal
        openValue={isAllFieldModal}
        closeFunction={() => setIsAllFieldModal(false)}
        // mainHeading="ADOPT SIGNATURE AND SUBMIT"
        modalWidth={'30rem'}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.3rem' }}>
            <Image src={'/svgs/alertIcon.svg'} height={17} width={17} alt="alert" />
            <Typography sx={{ fontSize: '1.2rem', color: COLORS.RED_600, fontWeight: 'bold' }}>
              Alert:
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '1rem', margin: '0.3rem 0' }}>
            Please complete all required fields before proceeding.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '0.3rem',
              justifyContent: 'end',
              marginTop: '1rem'
            }}
          >
            <ButtonWitnLoading
              text="Cancel"
              bg="black"
              textColor="white"
              handleClick={() => setIsAllFieldModal(false)}
            />
            <ButtonWitnLoading text="Continue" handleClick={() => setIsAllFieldModal(false)} />
          </Box>
        </Box>
      </CustomModal>
    </form>
  );
};

export default InitialForm;
