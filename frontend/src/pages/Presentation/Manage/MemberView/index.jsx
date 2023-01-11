import {
  Badge,
  Box,
  Divider,
  Flex,
  GlobalLoading,
  makeStyles,
  Typography,
  useMediaQuery
} from '@cads-ui/core';
import { Icon } from '@iconify/react';
import { CssBaseline, Drawer, IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import useSelectorOnly from '~/hooks/useOnlySelector';
import ChatView from './ChatView';
import MemberSlideShow from './SlideShow';

const useStyles = makeStyles((theme) => ({
  main: {
    w: '100vw',
    h: '100vh',
    display: 'flex'
  },

  slideShow: {
    flexGrow: 1,
    height: '100vh'
  },

  chatView: {
    maxWidth: '540px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red'
  },

  newChatWrap: (props) => ({
    position: 'absolute',
    bottom: '36px',
    right: '48px',
    transform: 'scale(1.5)'
  }),

  newChat: {
    p: 2,
    borderRadius: '50px',
    bgColor: 'grey.300',
    w: 36,
    h: 36
  }
}));

const drawerWidth = 540;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  flexGrow: 1,
  h: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}));

function PresentMemberView() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ down: 'md' });

  // Drawer
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // Handle logic trong getPresentationByCode trước khi implement
  const presentation = useSelectorOnly('presentation', [], true);
  if (presentation.loading) return <GlobalLoading />;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Flex sx={{ display: 'flex' }}>
      <CssBaseline />
      <Main open={open}>
        <Flex className={classes.slideShow}>
          <MemberSlideShow />
          <Box className={classes.newChatWrap}>
            <Badge content="2">
              <Flex center className={classes.newChat}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: 'none' }) }}
                >
                  <Icon sx={{ fs: 20 }} icon="ic:outline-message" />
                </IconButton>
              </Flex>
            </Badge>
          </Box>
        </Flex>
      </Main>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <Icon icon="material-symbols:chevron-left" />
            ) : (
              <Icon icon="material-symbols:chevron-right" />
            )}
          </IconButton>
          <Typography variant="h5">Chat box</Typography>
        </DrawerHeader>
        <Divider />
        <Box className={classes.chatView}>
          <ChatView />
        </Box>
      </Drawer>
    </Flex>
  );
}

export default PresentMemberView;
