import styled from '@emotion/styled';

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MainHeading = styled.div`
  font-family: 'Inter Bold';
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

export const RegularText = styled.div`
  font-family: 'Inter Regular';
  font-size: 14px;
  text-align: left;
  padding-bottom: 10px;
`;

export const ButtonRow = styled.div`
  display: flex;
  margin: '5px';
  justify-content: end;
  padding: 5px 0px;
`;

export const StyledList = styled.ul`
  padding-left: 20px;
  margin: 0;
  list-style-type: disc;
  font-family: 'Inter Regular';
`;

export const StyledListItem = styled.li`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
`;
