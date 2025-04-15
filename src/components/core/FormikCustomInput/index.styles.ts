import styled from '@emotion/styled';
import { Box, OutlinedInput, Typography } from '@mui/material';

interface StyledOutlinedInputProps {
  height?: string;
}
interface ICustomInputWrapper {
  labelStyle?: string;
}

// Use the interface as the type for the styled component
export const StyledOutlinedInput = styled(OutlinedInput)<StyledOutlinedInputProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : '44px')};
  padding: 10px 5px;
  border-radius: 5px;
  /* border: 1px solid rgba(16, 24, 40, 0.05); */

  input#outlined-adornment-weight {
    height: ${({ height }) => (height ? height : '0.5rem')};
  }
  // @media (max-height: 800px) {
  //   height: ${({ height }) => (height ? height : '34px')};
  // }
`;

export const ErrorTypography = styled(Typography)`
  color: red;
  font-size: 0.8rem;
`;
export const Label = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  color: #000000;
  margin-bottom: 0.2rem;
  min-width: fit-content;
  /* @media (max-width:1440px) {
    font-size: 0.7rem;
  } */
`;
export const QuaterDate = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  color: #000000;
  margin-bottom: 0.2rem;
  min-width: 3rem;

  @media (max-width: 1440px) {
    font-size: 0.7rem;
  }
`;
export const CustomInputWrapper = styled(Box)<ICustomInputWrapper>`
  width: 100%;
  display: ${({ labelStyle }) => (labelStyle === 'inline' ? 'flex' : 'block')};
  column-gap: 2rem;
  align-items: center;
`;
