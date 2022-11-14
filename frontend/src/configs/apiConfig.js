import { getEnv } from '~/helper';

export const apiConfig = {
  baseUrl: getEnv('VITE_API_URL')
};
