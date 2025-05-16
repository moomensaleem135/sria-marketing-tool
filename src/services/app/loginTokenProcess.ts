import { API_PROCESS_LOGIN_TOKEN } from '@/constants/api';
import { postRequest, postWithoutBodyRequest } from '../utils';
import axios from 'axios';

export const ProcessLoginToken = async (token: string) => {
  try {
    const resp = await postWithoutBodyRequest(
      `https://secureria-member.com/api/sria/marketing/${API_PROCESS_LOGIN_TOKEN}/?token=${token}`
    );

    return resp.data;
  } catch (error: any) {
    if (error) {
      throw new Error(error.response.data.detail);
    }
  }
};
