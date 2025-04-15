'use client';
import CustomPagination from '@/components/core/pagination';
import AgGridTable from '@/components/core/table/simpleAgTable';
import { AgGridFontSize } from '@/constants/variables';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import ReportFilter from './components/reportFilter';
const dummyReportData = [
  {
    marketing_name: 'FHTC Website',
    review_date: '12-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Email Campaign 1',
    review_date: '1-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Linked Post 1',
    review_date: '24-1-2024',
    advisor_name: 'Thomas',
    report: 'cco'
  },
  {
    marketing_name: 'Twitter Post 2',
    review_date: '21-12-2024',
    advisor_name: 'Marigal',
    report: 'cco'
  },
  {
    marketing_name: 'FHTC Website',
    review_date: '12-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Email Campaign 1',
    review_date: '1-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Linked Post 1',
    review_date: '24-1-2024',
    advisor_name: 'Thomas',
    report: 'cco'
  },
  {
    marketing_name: 'Twitter Post 2',
    review_date: '21-12-2024',
    advisor_name: 'Marigal',
    report: 'cco'
  },
  {
    marketing_name: 'FHTC Website',
    review_date: '12-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Email Campaign 1',
    review_date: '1-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Linked Post 1',
    review_date: '24-1-2024',
    advisor_name: 'Thomas',
    report: 'cco'
  },
  {
    marketing_name: 'Twitter Post 2',
    review_date: '21-12-2024',
    advisor_name: 'Marigal',
    report: 'cco'
  },
  {
    marketing_name: 'FHTC Website',
    review_date: '12-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Email Campaign 1',
    review_date: '1-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Linked Post 1',
    review_date: '24-1-2024',
    advisor_name: 'Thomas',
    report: 'cco'
  },
  {
    marketing_name: 'Twitter Post 2',
    review_date: '21-12-2024',
    advisor_name: 'Marigal',
    report: 'cco'
  },
  {
    marketing_name: 'FHTC Website',
    review_date: '12-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Email Campaign 1',
    review_date: '1-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Linked Post 1',
    review_date: '24-1-2024',
    advisor_name: 'Thomas',
    report: 'cco'
  },
  {
    marketing_name: 'Twitter Post 2',
    review_date: '21-12-2024',
    advisor_name: 'Marigal',
    report: 'cco'
  },
  {
    marketing_name: 'FHTC Website',
    review_date: '12-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Email Campaign 1',
    review_date: '1-2-2024',
    advisor_name: 'Hanson',
    report: 'cco'
  },
  {
    marketing_name: 'Linked Post 1',
    review_date: '24-1-2024',
    advisor_name: 'Thomas',
    report: 'cco'
  },
  {
    marketing_name: 'Twitter Post 2',
    review_date: '21-12-2024',
    advisor_name: 'Marigal',
    report: 'cco'
  }
];
const PartialReports = () => {
  const [activeColDefs, setActiveColDefs] = useState([
    {
      field: 'marketing_name',
      headerName: 'Marketing Review Name',
      flex: 1.5,
      minWidth: 255,

      resizable: false,
      suppressMovable: false,
      sortable: false,
      cellStyle: {
        'font-size': AgGridFontSize,
        whiteSpace: 'normal',
        lineHeight: '1.2',
        display: 'flex',
        'align-items': 'center'
      }
    },
    {
      field: 'review_date',
      headerName: 'Date Review',
      flex: 1.4,
      minWidth: 190,
      resizable: false,
      suppressMovable: false,
      sortable: false,
      cellStyle: { 'font-size': AgGridFontSize },
      cellRenderer: (params: any) => {
        return moment(params.data.due_date).format('MMMM DD, YYYY');
      }
    },

    {
      field: 'advisor_name',
      headerName: 'Advisor Name',
      flex: 1.4,
      minWidth: 170,
      resizable: false,
      suppressMovable: false,
      sortable: false,
      cellStyle: { 'font-size': AgGridFontSize }
    },

    {
      field: 'report',
      headerName: 'Report',
      flex: 0.5,
      minWidth: 90,
      resizable: false,
      suppressMovable: false,
      sortable: false,

      cellStyle: { 'font-size': AgGridFontSize },
      cellRenderer: (params: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <Image src={'/svgs/doc.svg'} height={25} width={25} alt="Doc" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <Image src={'/svgs/pdfIcon.svg'} height={25} width={25} alt="Pdf" />
            </Box>
          </Box>
        );
      },
      minHeight: 300
    }
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const getPaginatedData = () => {
    if (!dummyReportData) return [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return dummyReportData.slice(startIndex, endIndex);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
        Reports
      </Typography>
      <Box>
        <ReportFilter />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <AgGridTable
          rowData={getPaginatedData()}
          colDefs={activeColDefs}
          //   handleRowClick={(event: any) => handleEditTask(event.data?.id)}
          loading={false}
          gridOptions={{
            getRowStyle: () => ({
              cursor: 'pointer'
            })
          }}
        />
        <Box>
          <CustomPagination
            currentPage={currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
            totalPages={dummyReportData.length / pageSize}
            // setExpandedRows={setExpandedRows}
            totalRecords={dummyReportData.length}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PartialReports;
