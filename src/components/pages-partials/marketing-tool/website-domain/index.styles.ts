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

export const Text = styled.p`
  font-family: Inter Regular;
  font-size: 18px;
  margin: 0;
  margin-bottom: 5px;
`;
export const TextBold = styled.span`
  font-family: Inter SemiBold;
  font-size: 20px;
`;

export const FlexRow = styled.div`
display : flex;
flex-direction: row;
width: 100%
padding: 8px 0px;
margin-bottom : 10px;
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

export const TextBlue = styled.p`
  font-family: Inter SemiBold;
  font-size: 16px;
  color: ${COLORS.BLUE_TEXT};
  margin: 0px;
`;
export const Label = styled.label`
  font-family: Inter SemiBold;
  font-size: 13px;
  text-align: left;
  margin: 5px 0px;
`;

export const Container = styled.div<IContainerProps>`
  background: #fcfdff;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px !important;
  border-radius: 8px;
  height: ${({ customHeight }) => (customHeight ? customHeight : 'fit-content')};
  border: 1px solid ${COLORS.GRAY_400};
  box-shadow: 0px 0px 6px 2px #00224726;
  padding: 15px;
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
