import CustomInputField from '@/components/core/FormikCustomInput';
import SingleSelectPlaceholder from '@/components/core/SelectDropDown/SelectDropDownSingle';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
const ReportFilter = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });
  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem', marginTop: '2rem' }}>
      <SingleSelectPlaceholder
        name="marketing_type"
        options={[]}
        placeholder="Select Marketing Type"
      />
      <Datepicker
        placeholder={'Date Range'}
        popoverDirection="down"
        value={value}
        onChange={handleValueChange}
        containerClassName={'transactions-date-range relative w-full '}
        toggleIcon={(open) => <ArrowDownIcon className="h-4 w-4" />}
        inputClassName={'custom-date-picker  '}
        primaryColor="violet"
      />
      <CustomInputField
        icon="/svgs/search.svg"
        name="search"
        type="text"
        placeholder="Search Title, Advisor Name"
      />
    </Box>
  );
};

export default ReportFilter;
