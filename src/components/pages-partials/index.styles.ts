import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { Divider } from '@mui/material';

export const Line = styled(Divider)`
  margin: 10px 0px;
  border-color: ${COLORS.GREY_400};
`;

export const QuestionsHeading = styled.div`
  padding: 0;
  margin: 0px 15px 5px 15px;
  font-size: 22px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
`;

export const QuestionWrapper = styled.div`
  margin: 0px 15px;
`;

export const QuestionContainer = styled.div`
  margin-bottom: 10px;
`;

export const QuestionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Note = styled.div`
  font-size: 12px;
  text-align: left;
`;

export const QuestionDetails = styled.div`
  /* padding: 0 10px; */
`;

export const TextBlue = styled.p`
  font-size: 12px;
  color: ${COLORS.BLUE_THEME_MAIN};
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
  align-items: start;
  width: 89%;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: left;
`;

export const Example = styled.div`
  height: 'fit-content';
  /* border: 1px solid ${COLORS.GREY_400}; */
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
  padding: 5px;
  /* background: #ffffff; */
`;

export const SubQuestionDiv = styled.div`
  margin-top: 10px;
`;

export const IsUpdatedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 5px 0px;
`;

export const SubQuestion = styled.div`
  font-size: 13px;
  text-align: left;
  margin-bottom: 5px;
`;

export const Container = styled.div`
  background: #fcfdff;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px !important;
  border-radius: 8px;
  height: 'fit-content';
  border: 1px solid ${COLORS.GREY_400};
  box-shadow: 0px 0px 6px 2px #00224726;
  padding: 15px 0px;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  padding-right: 15px;
`;
export const TopHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
export const SelectMarketingType = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLORS.BLUE_THEME_MAIN};
`;
export const SelectMarketingTypeDis = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;
