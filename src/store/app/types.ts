export interface IAppState {
  loading: boolean;
  status: string;
  error: string | undefined;
}
export interface AnswerData {
  // [questionId: number]: {
  id: number;
  mainAnswer: string;
  subAnswers: { [key: string]: string };
  fileUpload?: string;
  isUpdated?: string;
  isUpdatedTrue: string;
  isUpdatedFalse: string;
  // };
}
export interface AgGridI {
  rowData: any;
  colDefs: any;
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  link?: string;
  background?: string;
  onGridReady?: (params: any) => void;
  rowHeight?: number;
  onSortByChange?: React.Dispatch<React.SetStateAction<string>> | undefined;
  sortBy?: string;
  orderBy?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  component?: string;
  loading?: any;
  height?: number;
  handleRowClick?: any;
  onCellValueChanged?: any;
  onCellEditingStopped?: any;
  autoGroupColumnDef?: any;
  gridOptions?: any;
  animateRows?: any;
  groupDefaultExpanded?: any;
  domLayout?: any;
}
