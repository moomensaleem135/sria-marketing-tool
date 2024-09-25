import styled from '@emotion/styled';
import { OutlinedInput, Typography } from '@mui/material';

export const StyledOutlinedInput = styled(OutlinedInput)({
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    display: 'none'
  },
  height: '42px !important',
  width: '100% !important '
});
export const ErrorTypography = styled(Typography)`
  color: red;
  font-size: 0.8rem;
`;
