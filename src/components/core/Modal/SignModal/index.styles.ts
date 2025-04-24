import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { Divider } from '@mui/material';

export const RedLine = styled(Divider)`
  margin: 10px 0 5px 0px;
  border-color: ${COLORS.RED_600};
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;
export const SignatureCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: fit-content;
`;

export const DateCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: fit-content;
`;

export const Text = styled.div`
  font-family: Inter Regular;
  font-size: 14px;
  text-align: left;
`;

export const BoldText = styled.div`
  font-size: 1rem;
  text-align: left;
  font-weight: bold;
`;
