import { API_GET_QUESTIONS, API_UPLOAD_REPORT } from '@/constants/api';
import { getRequest, postRequest } from '../utils';

export const GetQuestionsService = async (sidebarName: string) => {
  try {
    const resp = await getRequest(`${API_GET_QUESTIONS}?sidebar_name=${sidebarName}`);
    return resp.data;
  } catch (error: any) {
    if (error) {
      throw new Error(error.response.data.detail);
    }
  }
};
export const GetReportsService = async () => {
  try {
    const resp = await getRequest(API_UPLOAD_REPORT);
    return resp.data;
  } catch (error: any) {
    if (error) {
      throw new Error(error.response.data.detail);
    }
  }
};
export const UploadReportService = async (ReportData: FormData) => {
  try {
    const resp = await postRequest(API_UPLOAD_REPORT, ReportData);
    return resp.data;
  } catch (error: any) {
    if (error) {
      throw new Error(error.response.data.detail);
    }
  }
};
