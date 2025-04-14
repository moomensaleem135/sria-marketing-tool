import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

export const FieldInputStyled = styled(TextField)<{
  isShadow?: boolean;
  isEndContent?: string;
  customPadding?: string;
  fontWeight?: string;
  width?: string;
}>`
  ${({ isShadow }) =>
    isShadow
      ? `
  box-shadow: 0px 4px 3px 1px rgba(0, 0, 0, 0.25);
      `
      : `
`}
  ${({ isEndContent }) =>
    isEndContent && isEndContent?.length > 0
      ? `
    ::after {
      content: '${isEndContent}';
      position: absolute;
      right: 30px;
      top: 12px;
    }
    `
      : `
    `}

  width: ${({ width }) => (width ? width : '100%')};
  color: ${COLORS.BLACK_100};
  position: relative;
  border-radius: 5px;
  &.MuiTextField-root > div {
    border-radius: 5px;
    background-color: ${COLORS.WHITE_100};
    font-size: 14px;
    font-style: normal;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
  &.error {
    border-color: ${COLORS.RED_100};
    border-width: 2px;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-width: 0.5px;
      border-color: ${COLORS.BLUE_THEME};
    }
  }
  & .MuiInputBase-input {
    height: 18px;
    font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '800')};
    padding: ${({ customPadding }) => (customPadding ? customPadding : '12px 14px')};
  }
  font-weight: 'normal !important';
`;
