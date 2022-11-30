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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logoSrc from '~/assets/img/logo.png';

import { Icon } from '@iconify/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import authApi from '~/apis/authApi';
import GoogleLoginButton from '~/components/GoogleLoginButton';
import { PATH } from '~/constant/path';
import { MAX, MIN, REGEX } from '~/constant/validation';

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
  name: yup
    .string()
    .trim()
    .required()
    .max(MAX.NAME)
    .matches(REGEX.NAME, 'Tên không hợp lệ'),
  password: yup
    .string()
    .required()
    .min(MIN.PASSWORD)
    .max(MAX.PASSWORD)
    .matches(REGEX.PASSWORD, 'Mật khẩu không hợp lệ'),
  confirmPwd: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp !')
});

// -----------------------------
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const classes = useStyles();
  const [registering, setRegistering] = React.useState(false);

  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) {
    return <Navigate to={PATH.HOME} />;
  }

  const handleRegister = async (form) => {
    setRegistering(true);
    try {
      const apiRes = await authApi.postRegister(form);
      if (apiRes.status === 201) {
        toast.success(`Tạo tài khoản thành công. Xin chào ${form.name}`);
        navigate(PATH.LOGIN);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Tạo tài khoản thất bại, thử lại !'
      );
    } finally {
      setRegistering(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Flex spacing={2} direction="column" center sx={{ mb: 6 }}>
        <img className={classes.logo} src={logoSrc} />
        <Typography variant="h3" color="primary.main">
          Tạo tài khoản miễn phí
        </Typography>
      </Flex>

      {/* Social login */}
      <GoogleLoginButton />
      <Divider variant="dashed" spacing={4} />

      {/* Sign up with email */}
      <Flex
        component="form"
        onSubmit={handleSubmit(handleRegister)}
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
        <Input
          placeholder="Nhập họ tên"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:user-circle" />}
          error={Boolean(errors.name)}
          {...register('name')}
        />
        <InputPassword
          placeholder="Nhập mật khẩu"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:password" />}
          error={Boolean(errors.password)}
          {...register('password')}
        />
        <Typography variant="caption">
          Mật khẩu từ {MIN.PASSWORD} đến {MAX.PASSWORD} ký tự, chứa ít nhất một
          ký tự in thường, một ký tự in hoa, một ký tự số
        </Typography>
        <InputPassword
          placeholder="Nhập lại mật khẩu"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:password" />}
          error={Boolean(errors.confirmPwd)}
          {...register('confirmPwd')}
        />
        <Button loading={registering}>Đăng ký</Button>
      </Flex>
      <Divider spacing={4}>Hoặc</Divider>

      {/* Redirect login */}
      <Typography variant="body1" align="center">
        Bạn đã có tài khoản?{' '}
        <Link to={PATH.LOGIN} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fw: 500 }} color="primary.main" component="span">
            Đăng nhập ngay
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
}

export default RegisterPage;
