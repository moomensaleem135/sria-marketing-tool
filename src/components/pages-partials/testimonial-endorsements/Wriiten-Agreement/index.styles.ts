import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Col = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  align-items: center;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  width: '100%';
  flex-direction: row;
  justify-content: space-between;
`;

export const RegularText = styled(Typography)`
  font-size: 0.9rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  margin: '5px';
  justify-content: end;
  padding: 5px 0px;
`;
