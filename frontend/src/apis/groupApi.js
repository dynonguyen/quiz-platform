import ENDPOINTS from '~/constant/endpoints';
import useFetch from '~/hooks/useFetch';

const endpoint = ENDPOINTS.GROUP;

const groupApi = {
  getGroup: (groupID) => {
    return useFetch(`${endpoint}/${groupID}/members`);
  }
};

export default groupApi;
