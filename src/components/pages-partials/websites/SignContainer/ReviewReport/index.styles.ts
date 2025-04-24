import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuestionWrapper = styled.div`
  margin: 0px 15px;
`;

export const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const Question = styled.div`
  font-family: 'Inter Regular';
  font-size: 16px;
`;

export const SubQuestionDiv = styled.div`
  //   margin-top: 10px;
`;

export const Footer = styled.div``;
export const UserDataBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;
export const ReportRow = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 2rem;
`;
