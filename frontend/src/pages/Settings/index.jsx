import { Container, Grid, List, Typography } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLeftMenuStyles } from '~/common/styles';
import ComponentLoading from '~/components/ComponentLoading';
import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';
import { updateUserInfo } from '~/redux/slices/userSlice';

// -----------------------------
function SettingsPage() {
  const classes = useLeftMenuStyles();
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

  const MENU = [
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
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h3" fw={400} component="h1" color="grey.700">
        Cài đặt tài khoản
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <div className={classes.box}>
            <List items={MENU} isMargin />
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
