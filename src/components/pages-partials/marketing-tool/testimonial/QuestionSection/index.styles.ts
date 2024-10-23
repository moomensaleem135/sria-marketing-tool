import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';

export const TextBlue = styled.p`
  font-family: Inter SemiBold;
  font-size: 12px;
  color: ${COLORS.BLUE_TEXT};
  margin: 0px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* padding: 8px 0px; */
`;

export const Question = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 89%;
  font-family: Inter Regular;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;

export const Example = styled.div`
  font-family: Inter Regular;
  height: 'fit-content';
  border: 1px solid ${COLORS.GRAY_400};
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
  padding: 5px;
  background: #ffffff;
`;

export const BoldUnderline = styled.span`
  font-family: 'Inter SemiBold';
  text-decoration: underline;
  cursor: pointer;
`;

export const IsUpdatedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 15px 0px;
`;
