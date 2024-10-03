import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';

export const Line = styled.hr`
  border: 0.5px solid ${COLORS.GRAY_400};
  width: 100%;
  margin: 10px 0px;
`;

export const RedLine = styled.hr`
  border: 0.5px solid ${COLORS.RED_600};
  width: 100%;
  margin: 10px 0px;
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
  font-family: Inter SemiBold;
  font-size: 14px;
  text-align: left;
`;
