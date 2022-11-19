import axiosClient from './axiosClient';

const ENDPOINT = '/auth';

const authApi = {
  postRegister: (form) => {
    return axiosClient.post(`${ENDPOINT}/register`, form);
  },
  postLogin: (form) => {
    return axiosClient.post(`${ENDPOINT}/login`, form);
  },
  postLoginWithGoogle: (response) => {
    return axiosClient.post(`${ENDPOINT}/login/google`, response);
  }
};

export default authApi;
