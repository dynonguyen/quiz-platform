import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';

export const handleUnAuthentication = () => {
  localStorage.removeItem(LS_KEY.ACCESS_TOKEN);
  window.location.href = PATH.LOGIN;
};
