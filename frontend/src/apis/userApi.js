import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.USER;

const userApi = {
  getUserInfo: () => {
    return axiosClient.get(`${endpoint}/info`);
  }
};

export default userApi;
