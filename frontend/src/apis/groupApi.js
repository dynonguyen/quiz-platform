import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.GROUP;

const groupApi = {
  getGroup: (groupId) => {
    return axiosClient.get(`${endpoint}/${groupId}/members`);
  },
  postJoinGroup: (code) => {
    return axiosClient.post(`${endpoint}/join`, { code });
  }
};

export default groupApi;
