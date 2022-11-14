import axios from 'axios';
import queryString from 'query-string';
import { apiConfig } from '~/configs/apiConfig';

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'content-type': 'application/json'
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
