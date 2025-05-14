import CustomInputField from '@/components/core/FormikCustomInput';
import SingleSelectPlaceholder from '@/components/core/SelectDropDown/SelectDropDownSingle';
import { COLORS } from '@/constants/colors';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { Box, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
const marketingTypeFilterList = [
  { name: 'All', value: '' },
  { name: 'Websites', value: 'Websites' },
  { name: 'Email Campaigns or Newsletters', value: 'Email Campaigns or Newsletters' },
  { name: 'Blogs or Articles', value: 'Blogs or Articles' },
  { name: 'Presentations', value: 'Presentations' },
  { name: 'Performance Advertising', value: 'Performance Advertising' },
  { name: 'Social Media', value: 'Social Media' },
  { name: 'Testimonials & Endorsements', value: 'Testimonials & Endorsements' },
  { name: 'Reviews', value: 'Reviews' },
  { name: 'Third-Party Ratings', value: 'Third-Party Ratings' },
  { name: 'Brochures', value: 'Brochures' },
  { name: 'Videos', value: 'Videos' }
];
interface IFilterDate {
  filterDate: DateValueType;
  setFilterDate: (value: DateValueType) => void;
  setSearch: (value: string) => void;
  search: string;
  setMarketingTypeFilter: (value: string) => void;
  marketingTypeFilter: string;
  setCurrentPage: (value: number) => void;
}
const ReportFilter = ({
  filterDate,
  setFilterDate,
  setSearch,
  search,
  setMarketingTypeFilter,
  marketingTypeFilter,
  setCurrentPage
}: IFilterDate) => {
  const handleValueChange = (newValue: DateValueType) => {
    setFilterDate(newValue);
    console.log('chnages');
    setCurrentPage(1);
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setMarketingTypeFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem', marginTop: '2rem' }}>
      <SingleSelectPlaceholder
        name="marketing_type"
        options={marketingTypeFilterList}
        placeholder="Select Marketing Type"
        value={marketingTypeFilter}
        handleChange={handleSelectChange}
      />
      <Datepicker
        placeholder={'Date Range'}
        popoverDirection="down"
        value={filterDate}
        onChange={handleValueChange}
        containerClassName={'transactions-date-range relative w-full '}
        // toggleIcon={(open) => <ArrowDownIcon className="h-4 w-4" />}
        inputClassName={'custom-date-picker  '}
        primaryColor="blue"
      />
      <CustomInputField
        icon="/svgs/search.svg"
        name="search"
        type="text"
        value={search}
        placeholder="Search Title, Advisor Name"
        handleChange={(e) => {
          setSearch(e), setCurrentPage(1);
        }}
      />
    </Box>
  );
};

export default ReportFilter;
