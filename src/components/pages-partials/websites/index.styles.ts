import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';

interface IContainerProps {
  customHeight?: string;
}

export const TopHeading = styled.h1`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-top: 0px;
`;

export const TextBold = styled.span`
  font-size: 18px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8px 0px;
  margin-bottom: 10px;
`;
export const ButtonRightRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  // margin-top: 15px;
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
  font-size: 13px;
  text-align: left;
  margin: 5px 0px;
  font-weight: bold;
`;

export const SignContainerText = styled.p`
  font-size: 14px;
  margin: 0;
  margin-bottom: 5px;
`;
export const SignContainerTextBold = styled.span`
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;
