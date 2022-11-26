import { makeStyles } from '@cads-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '~/apis/authApi';
import { apiConfig } from '~/configs/apiConfig';
import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';
import { getEnv } from '~/helper';
import useDynamicScript from '~/hooks/useScript';
import { getUserInfo } from '~/redux/slices/userSlice';

// -----------------------------
const useStyles = makeStyles(() => ({
  root: { '& iframe': { margin: '0 auto !important' } }
}));

// -----------------------------
const GOOGLE_GSI_URL = 'https://accounts.google.com/gsi/client';
const GOOGLE_LOGIN_URL = `${apiConfig.baseUrl}/auth/login/google`;

// -----------------------------
function GoogleLoginButton() {
  const classes = useStyles();
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const handleCallbackResponse = async (response) => {
    try {
      const apiRes = await authApi.postLoginWithGoogle(response);
      if (apiRes.status === 200) {
        const { token } = apiRes.data;
        toast.success(`Đăng nhập thành công !`);
        localStorage.setItem(LS_KEY.ACCESS_TOKEN, token);
        dispatch(getUserInfo());
        navigate(state?.from || PATH.HOME);
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại, thử lại !');
      console.log(error);
    }
  };

  const gsiInitial = React.useCallback(() => {
    google.accounts.id.initialize({
      client_id: getEnv('VITE_GOOGLE_CLIENT_ID'),
      callback: handleCallbackResponse,
      login_uri: GOOGLE_LOGIN_URL,
      auto_select: false
    });

    google.accounts.id.disableAutoSelect();

    google.accounts.id.renderButton(ref.current, {
      theme: 'outline',
      size: 'large'
    });
  }, []);

  useDynamicScript(GOOGLE_GSI_URL, gsiInitial);

  return <div className={classes.root} ref={ref}></div>;
}

export default GoogleLoginButton;
