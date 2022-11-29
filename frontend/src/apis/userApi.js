import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.USER;

const userApi = {
  getUserInfo: () => {
    return axiosClient.get(`${endpoint}/info`);
  },
  postUpdateUser: (req) => {
    return axiosClient.post(`${endpoint}/edit`, req);
  }
};

export default userApi;
