import axiosClient from './axiosClient';

const ENDPOINT = '/account';

export const accountApi = {
  register: (form) => {
    return axiosClient.post(`${ENDPOINT}/register`, form);
  }
};
