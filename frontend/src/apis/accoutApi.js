import axiosClient from './axiosClient';

const ENDPOINT = '/account';

export const accountApi = {
  postRegister: (form) => {
    return axiosClient.post(`${ENDPOINT}/register`, form);
  },
  postLoginWithGoogle: (accessToken) => {
    return axiosClient.post(`${ENDPOINT}/login-gg`, { accessToken });
  }
};
