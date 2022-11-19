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
  }
};

export default accountApi;
