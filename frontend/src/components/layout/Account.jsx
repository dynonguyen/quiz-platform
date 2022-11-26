import {
  Button,
  Divider,
  Flex,
  List,
  makeStyles,
  Popover,
  useMediaQuery
} from '@cads-ui/core';
import { Icon } from '@iconify/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultUserAvt from '~/assets/img/default-user.png';
import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';
import { updateUserInfo } from '~/redux/slices/userSlice';

// -----------------------------
const useStyles = makeStyles((theme) => ({
  avt: {
    w: 40,
    h: 40,
    cursor: 'pointer',
    borderRadius: 50,
    transition: 'opacity 0.3s',
    '&:hover': {
      opacity: 0.9
    }
  },
  menu: {
    w: 280
  }
}));

// -----------------------------
function Account() {
  const { isAuth, email, name, avt } = useSelector((state) => state.user);
  const [avtRef, setAvtRef] = React.useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSm = useMediaQuery({ down: 'sm' });

  const userAvt = avt || defaultUserAvt;

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY.ACCESS_TOKEN);
    dispatch(updateUserInfo({ isAuth: false }));
    toast.success('Đăng xuất thành công');
    setAvtRef(null);
  };

  return !isAuth ? (
    <Flex spacing={2}>
      <Link to={PATH.LOGIN}>
        <Button variant="outlined">Đăng nhập</Button>
      </Link>
      <Link to={PATH.REGISTER}>
        <Button>Đăng ký</Button>
      </Link>
    </Flex>
  ) : (
    <Flex spacing={4}>
      <Link to={PATH.GROUP.NEW}>
        <Button
          endIcon={isSm ? null : <Icon icon="mdi:plus" />}
          variant="contained"
          isIconBtn={isSm}
        >
          {isSm ? <Icon icon="mdi:plus" /> : 'Tạo nhóm'}
        </Button>
      </Link>
      <img
        className={classes.avt}
        src={userAvt}
        alt={name}
        onClick={(e) => setAvtRef((pre) => (pre ? null : e.currentTarget))}
      />
      <Popover
        anchorEl={avtRef}
        anchorPosition={{ top: 10 }}
        anchorOrigin={{ horizontal: 'right' }}
        transformOrigin={{ horizontal: 'right' }}
        open={Boolean(avtRef)}
        onClose={() => setAvtRef(null)}
        className={classes.menu}
      >
        <List
          items={[{ primary: name, secondary: email, inset: false }]}
          allowSelect={false}
        />
        <Divider />
        <List
          items={[
            {
              primary: 'Quản lý tài khoản',
              icon: <Icon icon="material-symbols:settings-outline-rounded" />,
              onItemClick: () => {
                setAvtRef(null);
                navigate(PATH.SETTINGS.PROFILE);
              }
            },
            {
              primary: 'Đăng xuất',
              icon: <Icon icon="material-symbols:logout-rounded" />,
              onItemClick: handleLogout
            }
          ]}
        />
      </Popover>
    </Flex>
  );
}

export default Account;
