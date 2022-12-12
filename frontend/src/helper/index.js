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

export function getOriginPath(path = '') {
  return `${window.location.origin}${path}`;
}

export function generateGroupInviteLink(groupCode) {
  return `${window.location.origin}/group/join?code=${groupCode}`;
}

export function generateUniqueString(length = 8) {
  let res = '';
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const alLength = alphabet.length;

  for (let i = 0; i < length; i++) {
    res += alphabet[~~(Math.random() * alLength)];
  }

  return res;
}

export function openFullscreen(elem) {
  if (elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
}
