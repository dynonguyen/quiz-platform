import { Button, Flex, makeStyles } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import logoSrc from '~/assets/img/logo.png';
import { PATH } from '~/constant/path';
import Account from './Account';

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: { shadow: 1 },
  menu: {
    '& .cads-button': {
      bg: 'none',
      textDecoration: 'none',
      minW: '50px',
      p: 0,
      '&:hover': {
        color: 'primary.main'
      },
      '&.active': {
        color: 'primary.main'
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& > *:not(:first-child)': {
        ml: '2px'
      },
      '& .cads-button-icon__start': {
        mr: 0,
        '& + span': {
          display: 'none'
        }
      }
    }
  },
  logo: { w: 40, h: 40 }
}));

// -----------------------------
const MENU = [
  { to: PATH.HOME, text: 'Trang Chủ', icon: <Icon icon="ic:round-home" /> },
  {
    to: PATH.ACTIVITY,
    text: 'Hoạt Động',
    icon: <Icon icon="ic:baseline-history" />
  },
  { to: PATH.GROUP, text: 'Nhóm', icon: <Icon icon="mdi:account-group" /> }
];

// -----------------------------
function TopBar() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Flex className={classes.root} sx={{ p: 4 }} justifyContent="space-between">
      <Flex spacing={8}>
        <Link to={PATH.HOME}>
          <img src={logoSrc} alt="Logo" className={classes.logo} />
        </Link>
        <Flex className={classes.menu} spacing={6}>
          {MENU.map((item, index) => (
            <Link key={index} to={item.to}>
              <Button
                className={clsx({ active: pathname === item.to })}
                startIcon={item.icon}
                variant="text"
                size="large"
                color="grey"
              >
                {item.text}
              </Button>
            </Link>
          ))}
        </Flex>
      </Flex>
      <Account />
    </Flex>
  );
}

export default TopBar;
