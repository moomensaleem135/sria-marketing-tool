'use client';
import { AgGridI } from '@/store/app/types';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import React from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

const AgGridTable = ({
  rowData,
  colDefs,
  handleRowClick,
  rowHeight,
  background = 'transparent',
  gridOptions,
  height = 365,
  loading
}: AgGridI) => {
  return (
    <div className="ag-theme-quartz" style={{ height: height, background: background }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onRowClicked={handleRowClick}
        rowHeight={rowHeight}
        gridOptions={gridOptions}
        loading={loading}
      />
    </div>
  );
};
export default AgGridTable;
