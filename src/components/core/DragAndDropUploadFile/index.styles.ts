import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';

export const UploadDiv = styled(Box)``;
export const BrowseDiv = styled(Box)`
  background-color: #fcfdff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid lightgray;
  border-style: dashed;
  border-radius: 5px;
  margin-top: 0.5rem;
  cursor: pointer;
`;

export const UploadIcon = styled(Image)`
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

export const FileInput = styled('input')`
  display: none;
`;
export const FileNameDisplay = styled(Box)`
  margin-top: 10px;
`;

export const DocDiv = styled(Box)`
  margin-top: 0.5rem;
  display: flex;
  border: 1px solid lightgray;
  padding: 1rem 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

export const CustomBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #f0f0f0; // Customize the background color as needed
  border-radius: 8px; // Add border-radius for rounded corners
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Optional shadow effect
`;
