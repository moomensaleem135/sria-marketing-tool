import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const RegularityEditBtn = styled(Button)<{
  bg?: string;
  textColor?: string;
  border?: string;
}>`
  background-color: ${({ bg }) => bg || COLORS.BLUE_600} !important;
  color: ${({ textColor }) => textColor || 'white'};
  text-transform: capitalize;
  border: ${({ border }) => border || 'none'};

  &:hover {
    background-color: ${({ bg }) => bg || COLORS.BLUE_600} !important;
    color: ${({ textColor }) => textColor || 'white'};
  }
`;
