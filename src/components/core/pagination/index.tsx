import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material';
import React from 'react';

import { PageSizeBox, PagginationWrapper } from './index.styles';
interface ICustomPagination {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setExpandedRows?: (value: any) => void;
  totalRecords: number | undefined;
}
const CustomPagination = ({
  pageSize,
  totalPages,
  currentPage,
  setExpandedRows,
  setCurrentPage,
  setPageSize,
  totalRecords
}: ICustomPagination) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (setExpandedRows) {
      setExpandedRows({});
    }

    setCurrentPage(value);
  };

  const handlePageSizeChange = (event: any) => {
    if (setExpandedRows) {
      setExpandedRows({});
    }

    setPageSize(event.target.value as number);
    setCurrentPage(1); // Reset to first page when page size changes
  };
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRecords ? totalRecords : 0);

  return (
    <PagginationWrapper>
      <PageSizeBox>
        <Typography>Rows per page:</Typography>
        <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: '2rem !important' }}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </PageSizeBox>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
        <Box>
          <Typography>
            <span style={{ fontWeight: 'bold' }}> Results</span> {startIndex}-{endIndex} of{' '}
            {totalRecords}
          </Typography>
        </Box>
        <Pagination
          count={Math.ceil(totalPages)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
    </PagginationWrapper>
  );
};

export default CustomPagination;
