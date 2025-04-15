import * as React from 'react';

import { Main, StyledDataGrid } from './index.styles';
import { useRouter } from 'next/navigation';

interface ITable {
  rows: any[];
  columns: any[];
  title?: string;
}

export default function Table({ columns, rows, title }: ITable) {
  const updatedColumns = columns.map((column) => ({ ...column, sortable: false }));
  const router = useRouter();

  return (
    <Main>
      <StyledDataGrid
        rows={rows}
        columns={updatedColumns}
        getRowId={(row: any) => row.name + row.email}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        hideFooterPagination
        disableDensitySelector={true}
        scrollbarSize={0}
        onCellClick={(event) => {
          const columnField = event.field;
          if (title === 'client' && columnField === 'client') {
            router.push('/administration/clientdetail');
          }
        }}
      />
    </Main>
  );
}
