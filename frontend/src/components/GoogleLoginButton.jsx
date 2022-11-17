import { makeStyles } from '@cads-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '~/apis/authApi';
import { PATH } from '~/constant/path';
import { getEnv } from '~/helper';
import useDynamicScript from '~/hooks/useScript';

const useStyles = makeStyles(() => ({
  root: { '& iframe': { margin: '0 auto !important' } }
}));

function GoogleLoginButton() {
  const classes = useStyles();
  const ref = React.useRef(null);
  const navigate = useNavigate();

  const handleCallbackResponse = async (response) => {
    try {
      console.log(response.credential);
      const apiRes = await authApi.postLoginWithGoogle(response.credential);
      if (apiRes.status === 200) {
        navigate(PATH.HOME);
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại, thử lại !');
      console.log(error);
    }
  };

  useDynamicScript('https://accounts.google.com/gsi/client', () => {
    google.accounts.id.initialize({
      client_id: getEnv('VITE_GOOGLE_CLIENT_ID'),
      callback: handleCallbackResponse,
      auto_select: false
    });

    google.accounts.id.renderButton(ref.current, {
      theme: 'outline',
      size: 'large'
    });

    google.accounts.id.prompt();
  });

  return <div className={classes.root} ref={ref}></div>;
}

export default GoogleLoginButton;
