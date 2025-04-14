import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';

export const ButtonStyled = styled.button<{ isTransparent?: boolean; isHover?: boolean }>`
  font-family: 'Inter Regular', sans-serif;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  padding: 10px 10px;
  cursor: pointer;
  transition: 0.5s;
  display: block;
  border: 0;

  ${({ isTransparent }) =>
    isTransparent
      ? `
        font-family: "Inter SemiBold", sans-serif;
        background: white;
        border: 1px solid ${COLORS.BLUE_600};
        color: ${COLORS.BLUE_600};
      `
      : `
        background-color: ${COLORS.BLUE_600};
        color: white;
      `}

  ${({ isHover }) =>
    isHover
      ? `
        &:hover {
          background-color: #73a144;
        }
      `
      : ``}

  &:disabled {
    cursor: not-allowed;
  }
`;
