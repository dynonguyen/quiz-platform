import { LS_KEY } from '~/constant/key';

export function getEnv(key = '') {
  return import.meta.env[key] || process.env[key];
}

export function isProduction() {
  return getEnv('MODE') === 'production';
}

export function getToken() {
  return localStorage.getItem(LS_KEY.ACCESS_TOKEN);
}
