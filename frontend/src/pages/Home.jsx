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
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import groupApi from '~/apis/groupApi';
import { APP_NAME } from '~/constant';
import { PATH } from '~/constant/path';
import { MAX } from '~/constant/validation';
import { getOriginPath } from '~/helper';

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
  const [joining, setJoining] = React.useState(false);
  const codeInput = React.useRef(null);
  const navigate = useNavigate();

  const handleJoinGroup = async (code) => {
    setJoining(true);
    try {
      const apiRes = await groupApi.postJoinGroup(code);
      if (apiRes.status === 200 || apiRes.status === 201) {
        if (apiRes.status === 201) {
          toast.success('Tham gia nhóm thành công');
        }
        const { groupId } = apiRes.data;
        return navigate(`${PATH.MANAGE_GROUP.ROOT}/${groupId}`);
      }
    } catch (error) {
      toast.error('Mã lớp học hoặc liên kết không hợp lệ');
    }
    setJoining(false);
  };

  const handleCheckCode = () => {
    groupApi.postInviteJoinGroup(
      ['tuannguyentn2504@gmail.com', 'tramytbh@gmail.com'],
      '6381c6a6ca6ecbf47f4070d7'
    );
    if (!isAuth) {
      return navigate(PATH.LOGIN);
    }

    const codeOrLink = codeInput.current?.value.trim() || '';
    if (!codeOrLink) return;

    const joinPath = getOriginPath(`${PATH.GROUP.JOIN}?code=`);
    const isLink = codeOrLink.startsWith(joinPath);
    let code = '';

    function toastInvalidCode() {
      toast.error('Mã lớp học hoặc liên kết không hợp lệ');
    }

    if (!isLink) {
      if (!codeOrLink || codeOrLink.length > MAX.GROUP_CODE) {
        return toastInvalidCode();
      }
      code = codeOrLink;
    } else {
      const splitLink = codeOrLink.replace(joinPath, '').split('/');
      if (splitLink.length !== 1 || splitLink[0].length >= MAX.GROUP_CODE) {
        return toastInvalidCode();
      }
      code = splitLink[0];
    }

    handleJoinGroup(code);
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      {/* Join group */}
      <Grid container spacing={6}>
        <Grid item xs={12} sm={8}>
          <Flex center className={classes.box} spacing={2} wrap>
            <Input
              placeholder="Nhập mã lớp học hoặc liên kết"
              size="large"
              ref={codeInput}
            />
            <Button
              sx={{ flexShrink: 0 }}
              size="large"
              variant="soft"
              color="secondary"
              onClick={handleCheckCode}
              loading={joining}
            >
              {isAuth ? 'Tham gia' : 'Đăng nhập để tham gia'}
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
