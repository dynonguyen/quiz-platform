import axiosClient from './axiosClient';

const ENDPOINT = '/auth';

const authApi = {
  postRegister: (form) => {
    return axiosClient.post(`${ENDPOINT}/register`, form);
  },
  postLoginWithGoogle: (response) => {
    return axiosClient.post(`${ENDPOINT}/login/google`, response);
  }
};

export default authApi;
