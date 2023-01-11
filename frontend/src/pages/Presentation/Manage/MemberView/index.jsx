import { GlobalLoading, makeStyles, useMediaQuery } from '@cads-ui/core';
import useSelectorOnly from '~/hooks/useOnlySelector';
import MemberSlideShow from './SlideShow';

const useStyles = makeStyles((theme) => ({
  main: {
    w: '100vw',
    h: '100vh',
    display: 'flex'
  },

  slideShow: {
    flexGrow: 1
  },

  chatView: {
    w: '100vw',
    h: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red'
  }
}));

function PresentMemberView() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ down: 'md' });
  // Handle logic trong getPresentationByCode trước khi implement
  const presentation = useSelectorOnly('presentation', [], true);
  if (presentation.loading) return <GlobalLoading />;

  return (
    <div className={classes.main}>
      <div className={classes.slideShow}>
        <MemberSlideShow />
      </div>

      {/* <div className={classes.chatView}>
        <ChatView />
      </div> */}
    </div>
  );
}

export default PresentMemberView;
