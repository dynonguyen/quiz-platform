import {
  Badge,
  Box,
  Button,
  Flex,
  makeStyles,
  Typography,
  useEffectNotFirst
} from '@cads-ui/core';
import { Drawer, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Icon from '~/components/Icon';
import { SLIDE_TYPES } from '~/constant/presentation';
import { openFullscreen } from '~/helper';
import useSelectorOnly from '~/hooks/useOnlySelector';
import { savePresentation } from '~/redux/slices/presentationSlice';
import ChatView from '../MemberView/ChatView';
// -----------------------------
const useStyles = makeStyles((_) => ({
  root: (props) => ({
    p: props.fullscreen ? 0 : 6,
    bgColor: 'grey.300'
  }),

  slide: (props) => ({
    w: props.fullscreen ? '100vw' : 1,
    h: props.fullscreen ? '100vh !important' : 1,
    p: props.fullscreen ? 8 : 4,
    shadow: 3,
    position: 'relative',
    bgColor: 'background.default'
  }),

  chartWrap: {
    p: 4,
    w: (props) => (props.fullscreen ? '50%' : '65%'),
    margin: '0px auto',
    flexGrow: 1,
    maxH: 1,
    overflow: 'hidden',
    position: 'relative'
  },

  notChart: {
    p: 4,
    w: (props) => (props.fullscreen ? '50%' : '65%'),
    margin: 'auto auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxH: 1,
    overflow: 'hidden',
    position: 'relative'
  },

  userOnlineWrap: (props) => ({
    position: 'absolute',
    bottom: props.fullscreen ? '36px' : '16px',
    right: props.fullscreen ? '48px' : '24px',
    transform: props.fullscreen ? 'scale(1.5)' : 'none'
  }),

  userOnline: {
    p: 2,
    borderRadius: '50px',
    bgColor: 'grey.300',
    w: 36,
    h: 36
  },

  newChatWrap: (props) => ({
    position: 'absolute',
    bottom: props.fullscreen ? '36px' : '16px',
    right: props.fullscreen ? '128px' : '72px',
    transform: props.fullscreen ? 'scale(1.5)' : 'none'
  }),

  newChat: {
    p: 2,
    borderRadius: '50px',
    bgColor: 'grey.300',
    w: 36,
    h: 36
  },

  showChat: {
    zIndex: '200 !important'
  }
}));

// -----------------------------
const SLIDE_RATIO = 16 / 9;

// -----------------------------
function SlideShowControl({ activeSlide, currentSlide, slides }) {
  const dispatch = useDispatch();

  const handleNextSlide = () => {
    const slideLength = slides.length;
    const nextSlide = activeSlide < slideLength ? slides[activeSlide] : '';

    if (nextSlide) {
      dispatch(
        savePresentation({
          currentSlide: nextSlide.id,
          activeSlide: activeSlide + 1
        })
      );
    } else {
      handleStopPresentation();
    }
  };

  const handlePrevSlide = () => {
    if (activeSlide === 1) {
    } else {
      const prevSlide = slides[activeSlide - 2];
      dispatch(
        savePresentation({
          currentSlide: prevSlide.id,
          activeSlide: activeSlide - 1
        })
      );
    }
  };

  const handleStopPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    dispatch(savePresentation({ isPresenting: false }));
  };

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      sx={{
        position: 'fixed',
        zIndex: 999,
        left: 0,
        top: 0,
        p: 10,
        h: 1,
        opacity: 0,
        transition: 'opacity 1s',
        _hover: {
          opacity: 1
        }
      }}
    >
      <Button isFab size="large" color="#444" onClick={handleStopPresentation}>
        <Icon icon="material-symbols:close-rounded" />
      </Button>
      <Flex spacing={4}>
        <Button
          disabled={activeSlide === 1}
          isFab
          size="large"
          color="#444"
          onClick={handlePrevSlide}
        >
          <Icon icon="material-symbols:chevron-left-rounded" />
        </Button>
        <Button isFab size="large" color="#444" onClick={handleNextSlide}>
          <Icon icon="material-symbols:chevron-right-rounded" />
        </Button>
      </Flex>
    </Flex>
  );
}

// ------- Show End Slide
function EndSlide() {
  return (
    <Flex
      width={1}
      height={1}
      sx={{ textAlign: 'center', mt: 8 }}
      direction="column"
      backgroundColor="black"
    >
      <Typography variant="h3">Đây là slide cuối cùng!</Typography>
      <Typography variant="h3">
        Cảm ơn bạn đã tham gia khảo sát trên nền tảng Quiz Platform ❤
      </Typography>
    </Flex>
  );
}

// -----------------------------
function SlideShow() {
  const {
    slides = [],
    code,
    activeSlide,
    onlineCount,
    isPresenting,
    currentSlide
  } = useSelectorOnly('presentation', [
    'slides',
    'code',
    'activeSlide',
    'onlineCount',
    'isPresenting',
    'currentSlide'
  ]);
  const classes = useStyles({ fullscreen: isPresenting });
  const slideRef = React.useRef(null);
  const wrapper = React.useRef(null);

  // Chat
  const [right, setRight] = React.useState(false);

  const dispatch = useDispatch();
  const slide = slides[activeSlide - 1] || {};
  const { type } = slide;

  const calcRatioHeight = () => {
    if (slideRef.current) {
      const { width } = slideRef.current.getBoundingClientRect();
      const height = width / SLIDE_RATIO;
      slideRef.current.style.height = `${height}px`;
    }
  };

  const isMultipleSlide = (type) => {
    return type === SLIDE_TYPES.MULTIPLE_CHOICE ? true : false;
  };

  const isHeading = (type) => {
    return type === SLIDE_TYPES.HEADING ? true : false;
  };

  const toggleDrawer =
    (open = true) =>
    (event) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setRight(open);
    };

  // Change size when window resize
  React.useEffect(() => {
    calcRatioHeight();
    window.addEventListener('resize', calcRatioHeight);
    return () => window.removeEventListener('resize', calcRatioHeight);
  }, []);

  useEffectNotFirst(() => {
    if (!isPresenting) calcRatioHeight();
  }, [isPresenting]);

  // Toggle fullscreen
  React.useEffect(() => {
    if (isPresenting && wrapper.current) {
      const onExitFullscreen = () => {
        if (
          !document.fullscreenElement &&
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        ) {
          if (isPresenting) {
            dispatch(savePresentation({ isPresenting: false }));
          }
        }
      };

      const onFullscreenError = () => {
        toast.error('Đã xảy ra lỗi, vui lòng thử lại !');
        if (isPresenting) dispatch(savePresentation({ isPresenting: false }));
      };

      openFullscreen(wrapper.current);

      document.addEventListener('fullscreenchange', onExitFullscreen);
      document.addEventListener('fullscreenerror', onFullscreenError);
      return () => {
        document.removeEventListener('fullscreenchange', onExitFullscreen);
        document.removeEventListener('fullscreenerror', onFullscreenError);
      };
    }
  }, [isPresenting]);

  const Chat = () => {
    return (
      <Box sx={{ width: 540 }} role="presentation">
        <Box className={classes.chatView}>
          <ChatView />
        </Box>
      </Box>
    );
  };

  return (
    <div className={classes.root} ref={wrapper}>
      <Flex
        spacing={4}
        direction="column"
        className={classes.slide}
        ref={slideRef}
      >
        <Box className={!isMultipleSlide(type) ? classes.notChart : ''}>
          {!isHeading(type) && (
            <Typography fs={isPresenting ? 40 : 28} align="center">
              {slide.question}
            </Typography>
          )}

          {isHeading(type) && (
            <Typography variant="h1" fs={isPresenting ? 56 : 36} align="center">
              {slide.question}
            </Typography>
          )}

          {slide.desc && (
            <Typography
              fs={isPresenting ? 28 : 18}
              color="text.secondary"
              align="center"
              variant={isHeading(type) ? 'h4' : ''}
            >
              {slide.desc}
            </Typography>
          )}
        </Box>

        {/* Chart result */}
        {isMultipleSlide(type) && (
          <Flex center className={classes.chartWrap}>
            {/* <SlideResultChart slide={slide} isPresenting={isPresenting} /> */}
          </Flex>
        )}

        {/* Presentation code */}
        <Typography
          fs={isPresenting ? 32 : 20}
          align="center"
          color="text.secondary"
        >
          Mã tham dự trình chiếu <strong>{code}</strong>
        </Typography>

        {/* Online user */}
        <Box className={classes.userOnlineWrap}>
          <Badge content={onlineCount}>
            <Flex center className={classes.userOnline}>
              <Icon sx={{ fs: 20 }} icon="mdi:user" />
            </Flex>
          </Badge>
        </Box>

        {/* New chat */}
        <Box className={classes.newChatWrap}>
          <Badge content="2">
            <Flex center className={classes.newChat}>
              <IconButton onClick={toggleDrawer(true)}>
                <Icon sx={{ fs: 20 }} icon="ic:outline-message" />
              </IconButton>
            </Flex>
          </Badge>
        </Box>
      </Flex>

      {/* Slide show control */}
      {isPresenting && (
        <SlideShowControl
          slides={slides}
          activeSlide={activeSlide}
          currentSlide={currentSlide}
        />
      )}

      <Drawer
        className={classes.showChat}
        anchor="right"
        open={right}
        onClose={toggleDrawer(false)}
      >
        {Chat()}
      </Drawer>
    </div>
  );
}

export default SlideShow;
