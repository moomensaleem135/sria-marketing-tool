import Paper from '@mui/material/Paper';

import { GridColDef } from '@mui/x-data-grid';

import CustomNoRowsOverlay from '@/components/core/NoRowsOverLay';

import { DataGridStyle, HeaderTag, StyleGrid } from './index.styles';

interface ICustomHeader {
  title: string;
  onPressSort?: () => void;
  onPressUnSort?: () => void;
}

const CustomHeader = ({ title }: ICustomHeader) => {
  return (
    <>
      <HeaderTag>{title}</HeaderTag>
      {/* <Image
        src={"/svgs/arrowUp.svg"}
        height={20}
        width={20}
        onClick={onPressSort}
      />
      <Image
        src={"/svgs/arrowDown.svg"}
        height={20}
        width={20}
        onClick={onPressUnSort}
      /> */}
    </>
  );
};

export default function DashboardTable() {
  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Sent Date" {...props} />;
      },
      field: 'sent_date',
      width: 150,
      align: 'left'
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Name" {...props} />;
      },
      field: 'name',
      width: 150,
      align: 'left'
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Open" {...props} />;
      },
      field: 'open',
      width: 150,
      align: 'left'
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Internal Clicks" {...props} />;
      },
      field: 'clicks',
      width: 200,
      align: 'left'
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Time Opened" {...props} />;
      },
      field: 'time_opened',
      width: 250,
      align: 'left'
    } as GridColDef
  ];

  const rows: any[] = [];

  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={rows}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          columnVisibilityModel={{
            id: false
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay
          }}
        />
      </Paper>
    </StyleGrid>
  );
}
