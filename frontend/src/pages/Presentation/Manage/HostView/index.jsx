import { makeStyles, useMediaQuery } from '@cads-ui/core';
import useSelectorOnly from '~/hooks/useOnlySelector';
import Control from './Control';
import SlideSettings from './SlideSettings';
import SlideShow from './SlideShow';
import SlideThumbs from './SlideThumbs';
import TopBar from './TopBar';

// -----------------------------
const HEIGHT = {
  TOPBAR: 72,
  CONTROL: 64
};
const WIDTH = {
  THUMBS: 200,
  SETTING: 380
};

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    w: '100vw',
    h: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  topbar: { h: HEIGHT.TOPBAR },

  control: { h: HEIGHT.CONTROL },

  main: {
    flexGrow: 1,
    h: `calc(100vh - ${HEIGHT.CONTROL + HEIGHT.TOPBAR}px)`,
    display: 'flex'
  },

  slideThumbs: {
    w: WIDTH.THUMBS,
    flexShrink: 0,
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: { w: '100vw' }
  },
  slideShow: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: { display: 'none' }
  },
  slideSettings: {
    w: WIDTH.SETTING,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: { w: '100vw' }
  }
}));

// -----------------------------
function PresentHostView() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ down: 'md' });
  const { openMobileSetting } = useSelectorOnly('presentation', [
    'openMobileSetting'
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.topbar}>
        <TopBar />
      </div>
      <div className={classes.control}>
        <Control />
      </div>
      <div className={classes.main}>
        {!openMobileSetting && (
          <div className={classes.slideThumbs}>
            <SlideThumbs />
          </div>
        )}
        {!isMobile && (
          <div className={classes.slideShow}>
            <SlideShow />
          </div>
        )}
        {(!isMobile || openMobileSetting) && (
          <div className={classes.slideSettings}>
            <SlideSettings />
          </div>
        )}
      </div>
    </div>
  );
}

export default PresentHostView;
