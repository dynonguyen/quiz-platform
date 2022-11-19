import { Grid, List, makeStyles, Typography } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import { Container } from '@mui/material';
import clsx from 'clsx';
import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ComponentLoading from '~/components/ComponentLoading';
import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';
import { updateUserInfo } from '~/redux/slices/userSlice';

// -----------------------------
const useStyles = makeStyles((_) => ({
  box: {
    shadow: 4,
    p: 4,
    borderRadius: '8px',
    '&.content': { h: 1 }
  }
}));

// -----------------------------
function SettingsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = window.location;

  if (pathname === PATH.SETTINGS.ROOT) {
    return <Navigate to={PATH.SETTINGS.PROFILE} />;
  }

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY.ACCESS_TOKEN);
    dispatch(updateUserInfo({ isAuth: false }));
    toast.success('Đăng xuất thành công');
  };

  const SETTINGS_MENU = [
    {
      primary: 'Hồ sơ cá nhân',
      icon: <Icon icon="ic:baseline-account-circle" />,
      selected: pathname === PATH.SETTINGS.PROFILE,
      onItemClick: () => navigate(PATH.SETTINGS.PROFILE)
    },
    {
      primary: 'Kích hoạt tài khoản',
      icon: <Icon icon="mdi:account-check" />,
      selected: pathname === PATH.SETTINGS.ACTIVATION,
      onItemClick: () => navigate(PATH.SETTINGS.ACTIVATION)
    },
    {
      primary: 'Cập nhật mật khẩu',
      icon: <Icon icon="mdi:password" />,
      selected: pathname === PATH.SETTINGS.UPDATE_PASSWORD,
      onItemClick: () => navigate(PATH.SETTINGS.UPDATE_PASSWORD)
    },
    {
      primary: 'Đăng xuất',
      icon: <Icon icon="material-symbols:logout-rounded" />,
      onItemClick: handleLogout
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h3" fw={400} component="h1" color="grey.700">
        Cài đặt tài khoản
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <div className={classes.box}>
            <List items={SETTINGS_MENU} isMargin />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={clsx(classes.box, 'content')}>
            <Suspense fallback={<ComponentLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SettingsPage;
