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
