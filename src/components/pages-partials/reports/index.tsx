'use client';
import CustomPagination from '@/components/core/pagination';
import AgGridTable from '@/components/core/table/simpleAgTable';
import { AgGridFontSize } from '@/constants/variables';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReportFilter from './components/reportFilter';
import { GetReportsService } from '@/services/app';
import { handleDownloadFile } from '@/hooks/useDownloadFile';
import { DateValueType } from 'react-tailwindcss-datepicker';

const PartialReports = () => {
  const [activeColDefs, setActiveColDefs] = useState([
    {
      field: 'marketing_reviewname',
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
      field: 'marketing_type_name',
      headerName: 'Marketing Type',
      flex: 1.5,
      minWidth: 125,

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
      minWidth: 150,
      resizable: false,
      suppressMovable: false,
      sortable: false,
      cellStyle: { 'font-size': AgGridFontSize },
      cellRenderer: (params: any) => {
        return moment(params.data.due_date).format('DD-MM-YYYY');
      }
    },

    {
      field: 'advisor_name',
      headerName: 'Advisor Name',
      flex: 1.4,
      minWidth: 120,
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadFile(params.data.files.doc);
              }}
            >
              <Image src={'/svgs/doc.svg'} height={25} width={25} alt="Doc" />
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}
              onClick={() => handleDownloadFile(params.data.files.pdf)}
            >
              <Image src={'/svgs/pdfIcon.svg'} height={25} width={25} alt="Pdf" />
            </Box>
          </Box>
        );
      }
      // minHeight: 300
    }
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [resportData, setReportData] = useState([]);
  const [totalReports, setTotalReports] = useState<number>(0);
  const [filterDate, setFilterDate] = useState<DateValueType>({
    startDate: '',
    endDate: ''
  });
  const [search, setSearch] = useState<string>('');
  const [marketingTypeFilter, setMarketingTypeFilter] = useState<string>('');

  const [isReportDataLoading, setIsReportDataLoading] = useState<boolean>(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // const getPaginatedData = () => {
  //   if (!resportData) return [];
  //   const startIndex = (currentPage - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;

  //   return resportData.slice(startIndex, endIndex);
  // };
  const getReportsData = async () => {
    try {
      setIsReportDataLoading(true);
      const params = {
        page: currentPage,
        pageSize,
        marketingTypeFilter,
        search,
        start_date: filterDate?.startDate === null ? '' : filterDate?.startDate,
        end_date: filterDate?.endDate === null ? '' : filterDate?.endDate
      };
      const resp = await GetReportsService(params);
      if (resp) {
        console.log('resp', resp);
        setTotalReports(resp.count);
        setReportData(resp.results);
        setIsReportDataLoading(false);
      }
    } catch (error) {
      setIsReportDataLoading(false);
    }
  };
  const handleTaskSearchChange = () => {
    // Clear any existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set a new timeout for delayed fetch
    searchTimeout.current = setTimeout(() => {
      getReportsData();
    }, 400); // 300ms debounce time
  };
  useEffect(() => {
    handleTaskSearchChange();
  }, [currentPage, pageSize, search, marketingTypeFilter, filterDate]);

  return (
    <Box>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
        Reports
      </Typography>
      <Box>
        <ReportFilter
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          setSearch={setSearch}
          search={search}
          setMarketingTypeFilter={setMarketingTypeFilter}
          marketingTypeFilter={marketingTypeFilter}
          setCurrentPage={setCurrentPage}
        />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <AgGridTable
          rowData={resportData}
          colDefs={activeColDefs}
          //   handleRowClick={(event: any) => handleEditTask(event.data?.id)}
          loading={isReportDataLoading}
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
            totalPages={totalReports / pageSize}
            // setExpandedRows={setExpandedRows}
            totalRecords={totalReports}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PartialReports;
