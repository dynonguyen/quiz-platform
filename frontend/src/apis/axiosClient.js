import axios from 'axios';
import queryString from 'query-string';
import { apiConfig } from '~/configs/apiConfig';
import { getToken } from '~/helper';

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
