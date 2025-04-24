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
}
const InitialForm = ({ fieldsData, formik, isAllFieldModal, setIsAllFieldModal }: IInitialForm) => {
  return (
    <form
      style={{ border: '1px solid #C3CAD2', padding: '1.5rem', borderRadius: '10px' }}
      onSubmit={formik.handleSubmit}
    >
      <Grid container display={'flex'} direction={'row'} columnSpacing={2} rowSpacing={4}>
        {fieldsData.map((data) => (
          <Grid item md={data.columnSize} key={data.id}>
            <Label> {data.fieldTitle}</Label>
            {data.type === 'text' && (
              <CustomInputField name={data.name} type={'text'} formik={formik} />
            )}
            {data.type === 'date' && <DatePickerWithIcon formik={formik} name={data.name} />}
            {data.type === 'upload' && data.isFileUpload === true && (
              <FileUpload formik={formik} isDelete name={data.name} />
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
