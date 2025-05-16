import { postRequest } from '@/services/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
const getTokenHeader = () => {
  const extraHeaders: { authorization?: string } = {};
  const token = Cookies.get('token');
  if (token) {
    // token = JSON.parse(token);
    extraHeaders['authorization'] = `token ${token}`;
  }

  return extraHeaders;
};
export const downloadAwsFile = async (url: string | undefined) => {
  try {
    const extraHeaders = getTokenHeader();
    const resp = await axios.post(
      'https://secureria-member.com/api/s3-download-url/',
      { file_url: url },
      {
        headers: {
          ...extraHeaders
        }
      }
    );

    return resp.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};
