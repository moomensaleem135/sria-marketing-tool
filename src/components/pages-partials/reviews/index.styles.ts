import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';

interface IContainerProps {
  customHeight?: string;
}

export const TopHeading = styled.h1`
  font-family: Inter SemiBold;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`;

export const TextBold = styled.span`
  font-family: Inter SemiBold;
  font-size: 18px;
`;

export const FlexRow = styled.div`
  display: flex;
  width: 100%;
  /* padding: 8px 0px; */
  margin-bottom: 10px;
  align-items: end;
`;

export const ButtonRightRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

export const ButtonLeftRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  font-family: Inter SemiBold;
  font-size: 13px;
  text-align: left;
  margin: 5px 0px;
`;

export const SignContainerText = styled.p`
  font-family: Inter Regular;
  font-size: 14px;
  margin: 0;
  margin-bottom: 5px;
`;

export const SignContainerTextBold = styled.span`
  font-family: Inter SemiBold;
  font-size: 16px;
  text-decoration: underline;
`;
