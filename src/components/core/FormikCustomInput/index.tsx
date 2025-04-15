'use client';

import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import Image from 'next/image';
import React, { KeyboardEvent, useState } from 'react';

import { CustomInputWrapper, ErrorTypography, Label, StyledOutlinedInput } from './index.styles';

interface ICustomField {
  name: string;
  labelStyle?: string;
  placeholder?: string;
  type: string;
  label?: string;
  labelSize?: string;
  background?: string;
  value?: number | string;
  handleChange?: (e: string) => void;
  icon?: string;
  handleKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  height?: string;
  formik?: {
    values: Record<string, any>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Record<any, any>;
    touched: Record<any, any>;
  };
  endIcon?: any;
  disable?: boolean;
}

const CustomInputField = ({
  name,
  labelStyle,
  placeholder,
  type,
  label,
  formik,
  background,
  height,
  icon,
  handleChange,
  handleKeyDown,
  endIcon,
  value,
  disable
}: ICustomField) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

  return (
    <CustomInputWrapper labelStyle={labelStyle}>
      {label && <Label>{label}</Label>}
      <Box sx={{ width: '100%' }}>
        <StyledOutlinedInput
          disabled={disable ? disable : false}
          id="outlined-adornment-weight"
          aria-describedby="outlined-weight-helper-text"
          name={name}
          placeholder={placeholder}
          startAdornment={icon ? <Image src={icon} alt="icon" height={20} width={20} /> : ''}
          endAdornment={
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? (
                    <Image src={'/svgs/eyeHidden.svg'} height={20} width={20} alt="eye" />
                  ) : (
                    <Image src={'/svgs/eyeVisible.svg'} height={22} width={22} alt="eye" />
                  )}
                </IconButton>
              </InputAdornment>
            ) : endIcon ? (
              endIcon
            ) : (
              ''
            )
          }
          value={formik?.values[name] ? formik?.values[name] : value ? value : ''}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          onChange={
            handleChange
              ? (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)
              : formik?.handleChange
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown && handleKeyDown(e)
          }
          error={formik?.errors[name] && formik?.touched[name] ? true : false}
          sx={{
            backgroundColor: background ? background : 'white'
          }}
          height={height}
        />
        {formik?.errors[name] && formik?.touched[name] && (
          <ErrorTypography>{formik?.errors[name]}</ErrorTypography>
        )}
      </Box>
    </CustomInputWrapper>
  );
};

export default CustomInputField;
