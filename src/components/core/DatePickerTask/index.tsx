import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { StyledOutlinedInput, ErrorTypography } from './index.styles';

interface DatePickerWithIconProps {
  formik?: any; // Adjust type as per your Formik configuration
  name: string;
  placeholder?: string;
  dateType?: string;
  labelKey?: string;
  disable?: boolean;
}

function DatePickerWithIcon({ formik, name, disable }: DatePickerWithIconProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    if (disable) {
      return;
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? moment(date).format('YYYY-MM-DD') : null;

    formik.setFieldValue(name, formattedDate);
  };

  const selectedDate = formik.values[name];
  const displayDate = selectedDate ? moment(selectedDate).toDate() : null;
  const formattedDate = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '';
  const error = formik.errors[name];

  return (
    <div style={{ width: '100%' }}>
      <DatePicker
        selected={displayDate}
        onChange={handleDateChange}
        placeholderText="DD/MM/YYYY"
        disabled={disable ? true : false}
        className="datePicker"
        customInput={
          <StyledOutlinedInput
            value={formattedDate}
            disabled={disable ? true : false}
            startAdornment={
              <InputAdornment position="start">
                <CalendarTodayIcon
                  onClick={handleIconClick}
                  style={{
                    cursor: disable ? 'default' : 'pointer',
                    opacity: disable ? 0.4 : 1,
                    height: '20px',
                    width: '20px'
                  }}
                />
              </InputAdornment>
            }
            sx={{ fontSize: '0.9rem' }}
            error={error}
          />
        }
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onSelect={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
      />
      {error && (
        <div>
          <ErrorTypography>{error}</ErrorTypography>
        </div>
      )}
    </div>
  );
}

export default DatePickerWithIcon;
