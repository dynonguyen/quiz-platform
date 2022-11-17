import axiosClient from './axiosClient';

const ENDPOINT = '/auth';

const authApi = {
  postRegister: (form) => {
    return axiosClient.post(`${ENDPOINT}/register`, form);
  },
  postLoginWithGoogle: (accessToken) => {
    return axiosClient.post(`${ENDPOINT}/login-gg`, {
      access_token: accessToken
    });
  }
};

export default authApi;
