import { ReactNode } from 'react';

export interface IAppState {
  loading: boolean;
  status: string;
  error: string | undefined;
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
export interface SubAnswers {
  [key: string]: string; // If it can have any string keys
}

export interface Answer {
  id: number;
  mainAnswer?: string;
  subAnswers?: SubAnswers; // Optional since some answers don't have sub-questions
  isUpdated?: string; // Optional since not all answers have this field
  fileUpload?: string;
}
interface SubQuestion {
  text: string;
  isCheckbox?: boolean;
  isRadio?: boolean;
}

interface Question {
  id: number;
  question: string | ReactNode;
  answerInstructions?: string;
  details?: string;
  notes?: string | ReactNode;
  example?: string | ReactNode;
  notes2?: string | ReactNode;
  isMultipleNotes?: boolean;
  subQuestions?: SubQuestion[];
  dragAndDrop?: string;
  note: string;
  isUpdated?: string;
  isUpdatedTrue: string;
  isUpdatedFalse: string;
  isQuestionWithNA?: boolean;
}
interface FieldData {
  id: number;
  name: string;
  fieldTitle: string;
  type: string; // Extend this union if more types are possible
  isFileUpload: boolean;
  columnSize: number;
}
export interface IQuestionReportContainer {
  answers: Answer[];
  questions: Question[];
  fieldData: FieldData[];
  formik: any;
}
export interface IQuestionSection extends IQuestionReportContainer {
  setAnswers: (value: Answer[] | ((prev: Answer[]) => Answer[])) => void;
  // formik1:any
}
