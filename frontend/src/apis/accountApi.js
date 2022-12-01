import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.ACCOUNT;

const accountApi = {
  checkVerified: () => {
    return axiosClient.get(`${endpoint}/check-verified`);
  },
  postSendActivateAccount: (data) => {
    return axiosClient.post(`${endpoint}/send-activate`, data);
  },
  postActivateAccount: (code) => {
    return axiosClient.post(`${endpoint}/activate`, { code });
  },
  checkPassword: (data) => {
    return axiosClient.post(`${endpoint}/check-password`, data);
  },
  postUpdatePassword: (data) => {
    return axiosClient.post(`${endpoint}/update-password`, data);
  },
  checkPasswordExists: () => {
    return axiosClient.get(`${endpoint}/check-password`);
  }
};

export default accountApi;
