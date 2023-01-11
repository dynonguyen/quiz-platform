import ENDPOINTS from '~/constant/endpoints';
import axiosClient from './axiosClient';

const endpoint = ENDPOINTS.CHAT;

const chatApi = {
  getChat: (presentationId) => {
    return axiosClient.get(`${endpoint}/view/${presentationId}`);
  },
  postCreateNewChat: (chat) => {
    return axiosClient.post(`${endpoint}/new`, chat);
  },
  putUpdateSeen: (chat, userId) => {
    return axiosClient.put(`${endpoint}/update`, { chat, userId });
  }
};

export default chatApi;
