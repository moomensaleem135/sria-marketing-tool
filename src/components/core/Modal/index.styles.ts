import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
export const CloseButton = styled(Button)`
  cursor: pointer;
  height: 2rem;
  min-width: 0px !important;
`;
export const MainHeadingTypo = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${COLORS.BLUE_TEXT};
`;
