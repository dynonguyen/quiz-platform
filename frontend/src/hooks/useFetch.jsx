import useSWR from 'swr';
import axiosClient from '~/apis/axiosClient';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

function useFetch(url) {
  return useSWR(url, fetcher);
}

export default useFetch;
