import { Grid } from '@mui/material';

import { Form, Formik } from 'formik';

import React from 'react';

import Button from '@/components/core/Button';
import DatePickerWithIcon from '@/components/core/DatePickerTask';
import FileUpload from '@/components/core/DragAndDropUploadFile';
import FieldInput from '@/components/core/FieldInput';

import { ButtonRightRow, FlexCol, FlexRow, Label } from '../index.styles';

interface FormValues {
  name: string;
  advisor: string;
  date: string;
  URL: string;
  upload: string;
}

interface Props {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
}

const AddMarketingPieceForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <FlexRow>
            <Grid container display={'flex'} direction={'row'} columnSpacing={2}>
              <Grid item md={5}>
                <FlexCol>
                  <Label htmlFor="name">Name or Title:</Label>
                  <FieldInput
                    {...formik.getFieldProps('name')}
                    placeholder=""
                    isShadow={false}
                    Left={1}
                  />
                </FlexCol>
              </Grid>
              <Grid item md={5}>
                <FlexCol>
                  <Label htmlFor="advisor">Advisor(s)</Label>
                  <FieldInput
                    {...formik.getFieldProps('advisor')}
                    placeholder=""
                    isShadow={false}
                    Left={1}
                  />
                </FlexCol>
              </Grid>
              <Grid item md={2}>
                <FlexCol>
                  <Label htmlFor="date">Date:</Label>
                  <DatePickerWithIcon formik={formik} name="date" />
                </FlexCol>
              </Grid>
            </Grid>
          </FlexRow>
          <FlexRow>
            <FlexCol>
              <Label htmlFor="URL">Location of Ad or URL:</Label>
              <FieldInput {...formik.getFieldProps('URL')} />
            </FlexCol>
          </FlexRow>
          <FlexRow>
            <FlexCol>
              <Label htmlFor="Upload">
                Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):
              </Label>
              <FileUpload formik={formik} isDelete name="upload" />
            </FlexCol>
          </FlexRow>
          <ButtonRightRow>
            <Button type="submit">Click to Begin</Button>
          </ButtonRightRow>
        </Form>
      )}
    </Formik>
  );
};

export default AddMarketingPieceForm;
