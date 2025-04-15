import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const Main = styled(Box)`
  height: 70vh;
  width: 100%;
  padding: 0 26px;
`;
export const StyledDataGrid = styled(DataGrid)`
  border: none;
  .MuiDataGrid-footerContainer {
    display: none;
  }

  .MuiDataGrid-row {
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #c3cad2;
    width: 99%;
  }
  .MuiDataGrid-row.Mui-hovered {
    background-color: white;
  }
  .MuiDataGrid-row:hover {
    background-color: white;
  }
  .MuiDataGrid-virtualScrollerContent {
    &:hover {
      background-color: transparent !important ;
    }
  }
  &.Mui-selected {
    background-color: transparent !important;
    &:hover {
      background-color: transparent !important ;
    }
  }
  .MuiDataGrid-row.MuiDataGrid-row.Mui-selected {
    background-color: white;
    &:hover {
      background-color: white;
    }
  }

  .MuiDataGrid-colCell:focus {
    outline: none;
  }

  .MuiDataGrid-cell:focus {
    outline: none;
  }
  .MuiDataGrid-columnHeaders {
    border-bottom: none;
  }
  .MuiDataGrid-columnHeader.MuiDataGrid-withBorderColor {
    border: none;
    outline: none !important;
    &:focus {
      outline: none;
    }
    &:hover {
      border: none !important;
    }
  }
  .MuiDataGrid-columnSeparator.MuiDataGrid-columnSeparator--sideRight {
    display: none;
  }
`;
