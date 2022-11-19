import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.AUTH;

const authApi = {
  postRegister: (form) => {
    return axiosClient.post(`${endpoint}/register`, form);
  },
  postLogin: (form) => {
    return axiosClient.post(`${endpoint}/login`, form);
  },
  postLoginWithGoogle: (response) => {
    return axiosClient.post(`${endpoint}/login/google`, response);
  }
};

export default authApi;
