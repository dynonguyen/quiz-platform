import useSWR from 'swr';
import axiosClient from '~/apis/axiosClient';
import { handleUnAuthentication } from '~/helper/authentication';

const fetcher = (url) =>
  axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response?.status == 401) {
        handleUnAuthentication();
      }
      throw error;
    });

function useFetch(url, options = {}) {
  return useSWR(url, fetcher, options);
}

export default useFetch;
