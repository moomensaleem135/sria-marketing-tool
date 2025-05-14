import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import DragDropIcon from '@/assets/images/svgs/icons/DragFile.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CustomModal from '../Modal';
import DeleteModal from './DeleteModal';
import {
  CustomBox,
  BrowseDiv,
  DocDiv,
  FileInput,
  FileNameDisplay,
  UploadIcon
} from './index.styles';
import { COLORS } from '@/constants/colors';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { removeFile, setFiles } from '@/store/app/appSlice';

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
  questionId?: number; // Add questionId prop to identify which question this file belongs to
  onUpload?: (file: File) => void; // Callback for when file is uploaded
  onDelete?: () => void; // Callback for when file is deleted
}

const FileUpload = ({
  formik,
  name,
  isDelete,
  filteredRowId,
  getPoliciesAndProcedureData,
  questionId,
  onUpload,
  onDelete
}: IUploadFile) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const browseDivRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const browseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const displayFileName = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    setSelectedFileName(fileName);
    setSelectedFile(file);
    formik.setFieldValue(name, file);

    // Dispatch to Redux store
    if (questionId) {
      dispatch(
        setFiles({
          questionId,
          file
        })
      );
    }

    // Call upload callback if provided
    if (onUpload) {
      onUpload(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setSelectedFileName(file.name);
    formik.setFieldValue(name, file);

    // Dispatch to Redux store
    if (questionId) {
      dispatch(
        setFiles({
          questionId,
          file
        })
      );
    }

    // Call upload callback if provided
    if (onUpload) {
      onUpload(file);
    }
  };

  const handleDelete = () => {
    setSelectedFileName(null);
    setSelectedFile(null);
    formik.setFieldValue(name, null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Dispatch to Redux store
    if (questionId) {
      dispatch(removeFile({ questionId }));
    }

    // Call delete callback if provided
    if (onDelete) {
      onDelete();
    }

    setIsRemoveModal(false);
  };

  useEffect(() => {
    if (formik?.values?.file?.file_name) {
      setSelectedFileName(formik.values.file.file_name);
      setSelectedFile(formik.values.file);
    }
  }, [formik?.values?.file?.file_name]);

  return (
    <>
      <BrowseDiv
        onClick={browseFiles}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        ref={browseDivRef}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <UploadIcon src={DragDropIcon} height={50} width={50} alt="Drag and Drop Icon" />
          <Typography>
            Drag and drop files here or click to
            <span style={{ color: 'blue', fontWeight: '500' }}> browse </span> your files
          </Typography>
        </Box>
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
              <UploadFileIcon style={{ fontSize: '40px' }} />
              <Box>
                <Typography style={{ color: 'blue', textDecoration: 'underline' }}>
                  {selectedFileName}
                </Typography>
                <Typography>
                  {selectedFile.size ? `${Math.round(selectedFile.size / 1024)} KB` : '50kb'}
                </Typography>
              </Box>
            </CustomBox>
            {isDelete && (
              <span onClick={() => setIsRemoveModal(true)} style={{ cursor: 'pointer' }}>
                <Typography
                  sx={{
                    color: COLORS.RED_600,
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
              <UploadFileIcon style={{ fontSize: '40px' }} />
              <Box>
                <Typography style={{ color: COLORS.BLUE_THEME_MAIN, textDecoration: 'underline' }}>
                  {selectedFileName}
                </Typography>
                <Typography>50kb</Typography>
              </Box>
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
            </CustomBox>
          </DocDiv>
        </FileNameDisplay>
      ) : (
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
          No file selected yet!
        </Typography>
      )}

      <CustomModal
        openValue={isRemoveModal}
        closeFunction={() => setIsRemoveModal(false)}
        mainHeading="Delete File?"
        closedIcon={true}
      >
        <DeleteModal
          handleClickClearAll={handleDelete}
          mainText="Are you sure?"
          subText="This will delete your resource permanently."
          setIsClearModal={setIsRemoveModal}
          submitBtnText="Delete"
        />
      </CustomModal>
    </>
  );
};

export default FileUpload;
