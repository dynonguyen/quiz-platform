import axiosClient from './axiosClient';

const ENDPOINT = '/user';

const userApi = {
  getUserInfo: () => {
    return axiosClient.get(`${ENDPOINT}/info`);
  }
};

export default userApi;
