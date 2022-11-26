import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.GROUP;

const groupApi = {
  getGroup: (groupID) => {
    return axiosClient.get(`${endpoint}/${groupID}/members`);
  }
};

export default groupApi;
