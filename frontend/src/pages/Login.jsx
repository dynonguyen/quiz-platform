import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputPassword,
  makeStyles,
  Typography
} from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import logoSrc from '~/assets/img/logo.png';

import { Icon } from '@iconify/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import authApi from '~/apis/authApi';
import GoogleLoginButton from '~/components/GoogleLoginButton';
import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';
import { MAX } from '~/constant/validation';
import { getUserInfo } from '~/redux/slices/userSlice';

// -----------------------------
const useStyles = makeStyles((_) => ({
  root: {
    mt: 20,
    mx: 'auto',
    maxW: 400,
    px: 6,
    py: 8,
    borderRadius: 4,
    shadow: 12,

    '& .cads-input-icon': {
      w: '1.2em'
    }
  },
  logo: {
    w: 72,
    h: 72,
    mx: 'auto'
  }
}));

// -----------------------------
const schema = yup.object({
  email: yup.string().required().email().max(MAX.EMAIL),
  password: yup.string().required().max(MAX.PASSWORD)
});

// -----------------------------
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const classes = useStyles();
  const [loggingIn, setLoggingIn] = React.useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) {
    return <Navigate to={state?.from || PATH.HOME} />;
  }

  const handleLogin = async (form) => {
    setLoggingIn(true);
    try {
      const apiRes = await authApi.postLogin(form);
      if (apiRes.status === 200) {
        const { token } = apiRes.data;
        toast.success(`Đăng nhập thành công !`);
        localStorage.setItem(LS_KEY.ACCESS_TOKEN, token);
        dispatch(getUserInfo());
        navigate(state?.from || PATH.HOME);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Đăng nhập thất bại, thử lại !'
      );
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Flex spacing={2} direction="column" center sx={{ mb: 6 }}>
        <img className={classes.logo} src={logoSrc} />
        <Typography variant="h3" color="primary.main">
          Đăng nhập
        </Typography>
      </Flex>

      {/* Social login */}
      <GoogleLoginButton />
      <Divider variant="dashed" spacing={4} />

      {/* Login with email */}
      <Flex
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        spacing={3}
        direction="column"
      >
        {Object.keys(errors).length > 0 && (
          <Alert variant="standard" type="error">
            {errors[Object.keys(errors)[0]].message}
          </Alert>
        )}
        <Input
          placeholder="Nhập email"
          fullWidth
          autoFocus
          size="small"
          startIcon={<Icon icon="ic:round-email" />}
          error={Boolean(errors.email)}
          {...register('email')}
        />
        <InputPassword
          placeholder="Nhập mật khẩu"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:password" />}
          error={Boolean(errors.password)}
          {...register('password')}
        />
        <Button loading={loggingIn}>Đăng nhập</Button>
      </Flex>
      <Divider spacing={4}>Hoặc</Divider>

      {/* Redirect login */}
      <Typography variant="body1" align="center">
        Bạn chưa có tài khoản?{' '}
        <Link to={PATH.REGISTER} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fw: 500 }} color="primary.main" component="span">
            Đăng ký ngay
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;
