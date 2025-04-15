'use client';
import { COLORS } from '@/constants/colors';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

import { Label, ErrorTypography } from '../FormikCustomInput/index.styles';

interface SingleSelectProps {
  options: { name: string; value: string }[];
  label?: string;
  name: string;
  placeholder: string;
  formik?: {
    values: any;
    handleChange: (event: SelectChangeEvent<string>) => void;
    errors: Record<any, any>;
    setFieldValue: any;
  };
  handleChange?: (event: SelectChangeEvent<string>) => void;
  disable?: boolean;
  value?: string;
  width?: string;
  borderRadius?: string;
  height?: string;
}

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const SingleSelectPlaceholder: React.FC<SingleSelectProps> = ({
  options,
  label,
  name,
  formik,
  placeholder,
  disable,
  handleChange,
  value,
  width,
  borderRadius = '5px',
  height
}) => {
  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   formik?.handleChange(event); // Call formik handleChange
  //   formik?.setFieldValue('frequency_due_date', {});
  // };

  const selectedValue = formik?.values[name] || '';

  return (
    <div>
      <Label>{label}</Label>
      <FormControl fullWidth error={Boolean(formik?.errors[name])}>
        <Select
          fullWidth
          name={name as string}
          displayEmpty
          value={formik ? (selectedValue as string) : value}
          onChange={formik ? formik.handleChange : handleChange} // Update state locally
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <p style={{ opacity: 0.5 }}>{placeholder}</p>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          // inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            height: height ? height : '45px !important',
            borderRadius: borderRadius,
            width: width
            // border: '1px solid #C3CAD2 !important',

            // '&:focus': {
            //   border: `1px solid ${COLORS.BLUE_600} !important` // Keep border blue on focus
            // },
            // '& .MuiOutlinedInput-notchedOutline': {
            //   borderColor: `${COLORS.BLUE_600} !important` // Ensure the border color is blue
            // },
            // '&:hover .MuiOutlinedInput-notchedOutline': {
            //   borderColor: `${COLORS.BLUE_600} !important` // Ensure the border color is blue on hover
            // }
          }}
          disabled={disable ? true : false}
        >
          {/* <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem> */}
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {formik?.errors[name] && <ErrorTypography>{formik?.errors[name]}</ErrorTypography>}
    </div>
  );
};

export default SingleSelectPlaceholder;
