import { TextFieldProps } from '@mui/material/TextField';
import { ChangeEventHandler } from 'react';

export type IInputProps = {
  name: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  type?: string;
  InputProps?: any;
  Left?: number;
  isShadow?: boolean;
  isEndContent?: string;
  customPadding?: string;
  fontWeight?: string;
} & TextFieldProps;
