import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.GROUP;

const groupApi = {
  getGroup: (groupId) => {
    return axiosClient.get(`${endpoint}/${groupId}/members`);
  },
  postJoinGroup: (code) => {
    return axiosClient.post(`${endpoint}/join`, { code });
  },
  postInviteJoinGroup: (emails, groupId) => {
    return axiosClient.post(`${endpoint}/invite`, { emails, groupId });
  },
  postCreateGroup: (form) => {
    return axiosClient.post(`${endpoint}/new`, form);
  }
};

export default groupApi;
