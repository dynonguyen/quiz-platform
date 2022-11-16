import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Input,
  InputPassword,
  makeStyles,
  Typography
} from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logoSrc from '~/assets/img/logo.png';

import { Icon } from '@iconify/react';
import React from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { accountApi } from '~/apis/accoutApi';
import FacebookLoginButton from '~/components/FacebookLoginButton';
import GoogleLoginButton from '~/components/GoogleLoginButton';
import { MAX, MIN } from '~/constant/validation';

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    mt: 20,
    mx: 'auto',
    maxW: 480,
    px: 6,
    py: 8,
    borderRadius: 4,
    shadow: 12,

    '& .cads-input-icon': {
      w: '1.2em'
    }
  },
  logo: {
    w: 50,
    h: 50,
    mx: 'auto'
  }
}));

// -----------------------------
const schema = yup.object({
  email: yup.string().required().email().max(MAX.EMAIL),
  name: yup.string().required().max(MAX.NAME),
  password: yup.string().required().min(MIN.PASSWORD).max(MAX.PASSWORD),
  confirmPwd: yup
    .string()
    .required('Please re-enter your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match !')
});

// -----------------------------
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const classes = useStyles();
  const [registering, setRegistering] = React.useState(false);

  const handleRegister = async (form) => {
    setRegistering(true);
    try {
      const apiRes = await accountApi.register(form);
      if (apiRes.status === 201) {
        toast.success(`Tạo tài khoản thành công. Xin chào ${form.name}`);
        navigate('/login');
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
          Create a free account
        </Typography>
      </Flex>

      {/* Social login */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <GoogleLoginButton />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FacebookLoginButton />
        </Grid>
      </Grid>

      <Divider spacing={4} />

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
          placeholder="Enter your email"
          fullWidth
          autoFocus
          size="small"
          startIcon={<Icon icon="ic:round-email" />}
          error={Boolean(errors.email)}
          {...register('email')}
        />
        <Input
          placeholder="Enter your name"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:user-circle" />}
          error={Boolean(errors.name)}
          {...register('name')}
        />
        <InputPassword
          placeholder="Enter your password"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:password" />}
          error={Boolean(errors.password)}
          {...register('password')}
        />
        <InputPassword
          placeholder="Re-enter your password"
          fullWidth
          size="small"
          startIcon={<Icon icon="mdi:password" />}
          error={Boolean(errors.confirmPwd)}
          {...register('confirmPwd')}
        />
        <Button sx={{ mt: '24px !important' }} loading={registering}>
          Register
        </Button>
      </Flex>
      <Divider spacing={4} />

      {/* Redirect login */}
      <Typography variant="body1" align="center">
        Have already an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fw: 500 }} color="primary.main" component="span">
            Login here
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
}

export default RegisterForm;
