import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const RecordKeepHeader = styled(Typography)`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${COLORS.BLUE_THEME_MAIN};
  text-align: center;
`;
export const RecordKeepDescription = styled(Typography)`
  font-size: 1rem;
  margin-top: 0.5rem;
`;
export const RecordRuleListItem = styled('li')`
  font-size: 0.9rem;
`;
