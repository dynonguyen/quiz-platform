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
  postInviteJoinGroup: (email, groupId) => {
    return axiosClient.post(`${endpoint}/invite`, { email, groupId });
  },
  postCreateGroup: (form) => {
    return axiosClient.post(`${endpoint}/new`, form);
  },
  postTransferOwner: (groupID, req) => {
    return axiosClient.post(`${endpoint}/${groupID}/members/`, req);
  },
  postAddMoreCoOwner: (groupID, req) => {
    return axiosClient.post(
      `${endpoint}/${groupID}/members/addmorecoowner`,
      req
    );
  },
  postRemoveCoOwner: (groupID, req) => {
    return axiosClient.post(
      `${endpoint}/${groupID}/members/removecoowner`,
      req
    );
  },
  postKichOutMember: (groupID, req) => {
    return axiosClient.post(
      `${endpoint}/${groupID}/members/kickoutmember`,
      req
    );
  }
};

export default groupApi;
