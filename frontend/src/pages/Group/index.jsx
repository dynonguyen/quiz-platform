import { Grid, List, Typography } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import { Container } from '@mui/material';
import { Suspense } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useLeftMenuStyles } from '~/common/styles';
import ComponentLoading from '~/components/ComponentLoading';
import { PATH } from '~/constant/path';

// -----------------------------
const ROOT_PATH = PATH.GROUP;

// -----------------------------
function GroupPage() {
  const classes = useLeftMenuStyles();
  const navigate = useNavigate();
  const { pathname } = window.location;

  if (pathname === ROOT_PATH.ROOT) {
    return <Navigate to={ROOT_PATH.LIST} />;
  }

  const MENU = [
    {
      primary: 'Nhóm của tôi',
      icon: <Icon icon="material-symbols:groups" />,
      selected: pathname === ROOT_PATH.LIST,
      onItemClick: () => navigate(ROOT_PATH.LIST)
    },
    {
      primary: 'Lớp đã tham gia',
      icon: <Icon icon="mdi:invite" />,
      selected: pathname === ROOT_PATH.JOINED,
      onItemClick: () => navigate(ROOT_PATH.JOINED)
    },
    {
      primary: 'Tạo nhóm mới',
      icon: <Icon icon="material-symbols:add-box-outline" />,
      selected: pathname === ROOT_PATH.NEW,
      onItemClick: () => navigate(ROOT_PATH.NEW)
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h3" fw={400} component="h1" color="grey.700">
        Quản lý nhóm
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <div className={classes.box}>
            <List items={MENU} isMargin />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Suspense fallback={<ComponentLoading />}>
            <Outlet />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GroupPage;
