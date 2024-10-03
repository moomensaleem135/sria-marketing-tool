import styled from '@emotion/styled';

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

export const MainHeading = styled.div`
  font-family: 'Inter Bold';
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Text = styled.div`
  font-family: 'Inter Regular';
  font-size: 16px;
  text-align: center;
  padding-bottom: 10px;
`;

export const BoldText = styled.div`
  font-family: 'Inter SemiBold';
  font-size: 14px;
  padding-bottom: 10px;
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
