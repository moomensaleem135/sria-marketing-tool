import { API_GET_QUESTIONS, API_UPLOAD_REPORT } from '@/constants/api';
import { getRequest, postRequest } from '../utils';
interface IReportsService {
  page: number;
  pageSize: number;
  marketingTypeFilter: string;
  search: string;
  start_date: string | Date | undefined;
  end_date: string | Date | undefined;
}
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
export const GetReportsService = async ({
  page = 1,
  pageSize = 10,
  marketingTypeFilter = '',
  search = '',
  start_date = '',
  end_date = ''
}: IReportsService) => {
  try {
    const resp = await getRequest(
      `${API_UPLOAD_REPORT}?page=${page}&page_size=${pageSize}&marketing_type=${marketingTypeFilter}&search=${search}&start_date=${start_date}&end_date=${end_date}`
    );

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
