import { ReactNode } from 'react';
export interface ITabFiles {
  questionId: number;
  fileType: string;
  file: File;
}
export interface IAppState {
  loading: boolean;
  status: string;
  error: string | undefined;
  tabFiles: ITabFiles[];
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
export interface IS3FileLink {
  file_name?: string;
  download_link: string;
  preview_link: string;
}
interface IFileLink {
  download_link: string;
  preview_link: string;
}
export interface Answer {
  id: number;
  mainAnswer?: string;
  subAnswers?: SubAnswers; // Optional since some answers don't have sub-questions
  isUpdated?: string; // Optional since not all answers have this field
  fileUpload?: string;
}
interface SubQuestion {
  id: string;
  html_sub_question_text: string;
  isCheckbox?: boolean;
  isRadio?: boolean;
  field_type: string;
  question_type: string;
  yes_text: string;
  no_text: string;
  is_na: boolean;
}

export interface Question {
  id: number;
  html_question_text: string;
  html_instructions_text?: string;
  html_details_text?: string;
  html_note_text_1?: string | ReactNode;
  html_example_text?: string | ReactNode;
  html_note_text_2?: string | ReactNode;
  isMultipleNotes?: boolean;
  subquestions: SubQuestion[];
  dragAndDrop?: string;
  note: string;
  isUpdated?: string;
  isUpdatedTrue: string;
  isUpdatedFalse: string;
  is_na?: boolean;
  display_order: number;
  show_subquestions: string;
}
export interface FieldData {
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
  modalList: any;
  // formik1:any
}
