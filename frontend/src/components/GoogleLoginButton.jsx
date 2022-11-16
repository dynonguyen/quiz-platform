import { Button } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { accountApi } from '~/apis/accoutApi';
import { getEnv } from '~/helper';

function GoogleLoginButton() {
  const [loading, setLoading] = React.useState(false);
  const loaded = React.useRef(false);
  const clientId = getEnv('VITE_GOOGLE_CLIENT_ID');

  const handleLoginFailure = async (response) => {
    console.log(response);
  };

  const handleLoginSuccess = async (response) => {
    try {
      if (!loaded.current) {
        loaded.current = true;
        return;
      }
      setLoading(true);

      console.log(response);
      const { accessToken } = response;

      const apiRes = await accountApi.postLoginWithGoogle(accessToken);
      const { status, data } = apiRes;

      if (status === 200) {
        handleLoginSuccess(data);
      }

      setLoading(false);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Đăng nhập thất bại, thử lại !';
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      autoLoad={false}
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          loading={loading}
          color="#c64d3a"
          fullWidth
          startIcon={<Icon icon="bi:google" />}
        >
          Tiếp tục với Google
        </Button>
      )}
    />
  );
}

export default GoogleLoginButton;
