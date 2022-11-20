import {
  Button,
  Chip,
  Flex,
  Grid,
  Input,
  makeStyles,
  Typography
} from '@cads-ui/core';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { APP_NAME } from '~/constant';
import { PATH } from '~/constant/path';

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    mt: 8
  },
  box: {
    p: 4,
    borderRadius: '8px',
    shadow: 4,
    minH: 150
  },
  title: {
    fontWeight: 500,
    fontSize: '1.8rem'
  }
}));

// -----------------------------
function HomePage() {
  const classes = useStyles();
  const { isAuth, name } = useSelector((state) => state.user);

  return (
    <Container className={classes.root} maxWidth="lg">
      {/* Join group */}
      <Grid container spacing={6}>
        <Grid item xs={12} sm={8}>
          <Flex center className={classes.box} spacing={2} wrap>
            <Input placeholder="Nhập mã lớp học hoặc liên kết" size="large" />
            <Button
              sx={{ flexShrink: 0 }}
              size="large"
              variant="soft"
              color="secondary"
            >
              Tham gia
            </Button>
          </Flex>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Flex center className={classes.box} spacing={2} direction="column">
            {isAuth ? (
              <>
                <Chip size="large" color="grey" variant="soft">
                  {name}
                </Chip>
                <Flex spacing={2} sx={{ mt: 2 }}>
                  <Link to={PATH.SETTINGS.PROFILE}>
                    <Typography fw={500} fs={14} color="secondary.light">
                      Chỉnh sửa hồ sơ
                    </Typography>
                  </Link>
                  <Typography fw={500} fs={14} color="secondary.light">
                    ●
                  </Typography>
                  <Link to={PATH.GROUP.ROOT}>
                    <Typography fw={500} fs={14} color="secondary.light">
                      Quản lý nhóm
                    </Typography>
                  </Link>
                </Flex>
              </>
            ) : (
              <>
                <Typography color="text.secondary" align="center">
                  Đăng nhập để trải nghiệm ngay tính năng thú vị của {APP_NAME}
                </Typography>
                <Flex spacing={2} sx={{ mt: 2 }}>
                  <Link to={PATH.LOGIN}>
                    <Chip variant="soft" clickable color="grey">
                      Đăng nhập
                    </Chip>
                  </Link>
                  <Link to={PATH.REGISTER}>
                    <Chip variant="soft" clickable color="grey">
                      Đăng ký
                    </Chip>
                  </Link>
                </Flex>
              </>
            )}
          </Flex>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
