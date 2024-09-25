// import { deletePolicesFile } from '@/services/app';
import DragDropIcon from '@/assets/images/svgs/icons/DragFile.svg';

import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import CustomModal from './CustomModal';
import DeleteModal from './DeleteModal';
import {
  CustomBox,
  BrowseDiv,
  DocDiv,
  FileInput,
  FileNameDisplay,
  UploadIcon
} from './index.styles';

interface IUploadFile {
  formik: {
    values: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    errors: Record<any, any>;
  };
  name: string;
  isDelete?: boolean;
  filteredRowId?: number;
  getPoliciesAndProcedureData?: any;
}

const FileUpload = ({
  formik,
  name,
  isDelete,
  filteredRowId,
  getPoliciesAndProcedureData
}: IUploadFile) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);

  const handleDelete = () => {
    setSelectedFileName(null);
    setSelectedFile(null);
    formik.setFieldValue(name, null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setIsRemoveModal(false);
  };

  // const handleDelete = async () => {
  //   try {
  //     const resp = await deletePolicesFile(String(filteredRowId));
  //     if (resp) {
  //       getPoliciesAndProcedureData();
  //       setSelectedFileName(null);
  //       setSelectedFile(null);
  //       formik.setFieldValue(name, null);
  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = '';
  //       }
  //       setIsRemoveModal(false);
  //     }
  //   } catch (error) {
  //     console.log('error');
  //   }
  // };

  const browseDivRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const browseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const displayFileName = (event: ChangeEvent<HTMLInputElement>) => {
    const fileName = event.target.files?.[0]?.name;
    if (event) {
      formik.setFieldValue(name, event?.target?.files?.[0]);
    }
    if (fileName) {
      setSelectedFileName(fileName);
    }
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (formik?.values?.file?.file_name) {
      setSelectedFileName(formik.values.file.file_name);
      setSelectedFile(formik.values.file);
    }
  }, [formik?.values?.file?.file_name]);
  console.log(
    'formik',
    formik?.values,
    'selectedFileName',
    selectedFileName,
    'selectedFile',
    selectedFile
  );

  return (
    <>
      <BrowseDiv onClick={browseFiles} ref={browseDivRef}>
        <UploadIcon src={DragDropIcon} height={70} width={70} alt="" />
        <Typography>
          Drag and drop files here or click to
          <span style={{ color: 'blue', fontWeight: '500' }}> browse </span> your files
        </Typography>
        <FileInput
          name={name}
          type="file"
          id="fileInput"
          accept=".pdf"
          onChange={displayFileName}
          ref={fileInputRef}
        />
      </BrowseDiv>

      {selectedFile ? (
        <FileNameDisplay>
          <DocDiv>
            <CustomBox>
              <UploadIcon src={DragDropIcon} height={40} width={40} alt="" />
              <Box>
                <Typography style={{ color: 'blue', textDecoration: 'underline' }}>
                  {selectedFileName}
                </Typography>
                <Typography>
                  {selectedFile.size ? `${Math.round(selectedFile.size / 1024)} KB` : '50kb'}
                </Typography>
              </Box>
              <UploadIcon src={DragDropIcon} height={25} width={30} alt="" />
            </CustomBox>
            {isDelete && (
              <span onClick={() => setIsRemoveModal(true)} style={{ cursor: 'pointer' }}>
                <Typography
                  sx={{
                    color: 'red',
                    fontSize: '0.9rem',
                    textDecoration: 'underline',
                    fontWeight: 500
                  }}
                >
                  Remove
                </Typography>
              </span>
            )}
          </DocDiv>
        </FileNameDisplay>
      ) : selectedFileName ? (
        <FileNameDisplay>
          <DocDiv>
            <CustomBox>
              <UploadIcon src={DragDropIcon} height={40} width={40} alt="" />
              <Box>
                <Typography style={{ color: 'blue', textDecoration: 'underline' }}>
                  {selectedFileName}
                </Typography>
                <Typography>50kb</Typography>
              </Box>
              <UploadIcon src={DragDropIcon} height={25} width={30} alt="" />
            </CustomBox>
            {isDelete && (
              <span onClick={() => setIsRemoveModal(true)} style={{ cursor: 'pointer' }}>
                <Typography>Remove</Typography>
              </span>
            )}
          </DocDiv>
        </FileNameDisplay>
      ) : (
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 800 }}>No file selected yet!</Typography>
      )}
      <CustomModal value={isRemoveModal} setValue={setIsRemoveModal} maxWidth="25rem">
        <DeleteModal
          handleClickClearAll={handleDelete}
          mainText="Delete File?"
          subText="This will delete your resource file permanently for the Compliance Program Overview."
          setIsClearModal={setIsRemoveModal}
          submitBtnText="Remove"
        />
      </CustomModal>
    </>
  );
};

export default FileUpload;
