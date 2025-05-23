import { AxiosError, AxiosRequestConfig } from 'axios';

import { REQUEST_HEADERS } from '../constants/api';
import axios from './apiConfig';
import { IRequestBody } from './service.types';
import Cookies from 'js-cookie';

const getTokenHeader = () => {
  const extraHeaders: { authorization?: string } = {};
  const token = Cookies.get('token') as string;
  if (token) {
    // token = JSON.parse(token);
    extraHeaders['authorization'] = `token ${token}`;
  }

  return extraHeaders;
};

export const postRequest = (url: string, body: IRequestBody | any, config?: AxiosRequestConfig) => {
  const extraHeaders = getTokenHeader();

  return axios.post(url, body, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...config?.headers
    }
  });
};
export const postWithoutBodyRequest = (
  url: string,
  // body?: IRequestBody | any,
  // isWithoutToken?: boolean,
  config?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();

  return axios.post(url, '', {
    // ...config,
    // headers: {
    //   // ...REQUEST_HEADERS,
    //   // ...extraHeaders,
    //   ...config?.headers
    // }
  });
};

export const putRequest = (url: string, body: IRequestBody | any, config?: AxiosRequestConfig) => {
  const extraHeaders = getTokenHeader();

  return axios.put(url, body, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...config?.headers
    }
  });
};

export const getRequest = (url: string, params?: string | any, config?: AxiosRequestConfig) => {
  const extraHeaders = getTokenHeader();
  let strParams;
  if (typeof params === 'number') {
    strParams = params.toString();
  }
  let routeUrl = url;
  if (params && params.length > 0) {
    routeUrl = routeUrl + params;
  }
  if (strParams && strParams.length > 0) {
    routeUrl = routeUrl + strParams;
  }

  return axios.get(routeUrl, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...config?.headers,
      ...extraHeaders
    }
  });
};

export const deleteRequest = (url: string, params?: string | any, config?: AxiosRequestConfig) => {
  let routeUrl = url;
  if (params.length > 0) {
    routeUrl = routeUrl + params;
  }
  const extraHeaders = getTokenHeader();

  return axios.delete(routeUrl, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...config?.headers,
      ...extraHeaders
    }
  });
};

export const patchRequest = (
  url: string,
  body: IRequestBody | any,
  config?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();

  return axios.patch(url, body, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...config?.headers
    }
  });
};

export const getErrorMessage = (json: AxiosError) => {
  return json?.response?.data?.message
    ? json?.response?.data?.message
    : json?.response?.data?.errors.length
      ? json?.response?.data?.errors
      : 'Error while processing your request';
};
