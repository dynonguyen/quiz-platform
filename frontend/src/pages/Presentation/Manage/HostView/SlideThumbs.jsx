import { alpha, Flex, makeStyles, Typography } from '@cads-ui/core';
import clsx from 'clsx';
import Icon from '~/components/Icon';

const THUMB_HEIGHT = 108;

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    px: 2,
    py: 4,
    bgColor: 'background.default'
  },

  thumbWrap: {
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    p: 2,

    '&.active': {
      _after: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        w: 1,
        h: 1,
        bgColor: alpha(theme.palette.primary.mainRgb, 0.25)
      },
      _before: {
        content: '""',
        position: 'absolute',
        h: 0.65,
        w: '4px',
        bgColor: 'primary.main',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
      }
    },

    '& .move-icon': {
      opacity: 0,
      transition: 'opacity 0.3s',
      fs: 20,
      cursor: 'pointer',
      _hover: {
        color: 'text.secondary'
      }
    },

    '&:hover .move-icon': {
      opacity: 1
    }
  },

  thumbLeft: {
    w: 36,
    px: 1,
    py: 2,
    h: THUMB_HEIGHT
  },

  thumbBox: {
    bgColor: 'background.default',
    border: `solid 1px ${theme.palette.border.main}`,
    borderRadius: '4px',
    cursor: 'pointer',
    flexGrow: 1,
    h: THUMB_HEIGHT,
    p: 2,
    position: 'relative',
    transition: 'opacity 0.3s',
    zIndex: 2,

    '& .delete-slide-icon': {
      zIndex: 3,
      position: 'absolute',
      fs: 20,
      right: '8px',
      top: '8px',
      color: 'error.main',
      opacity: 0,
      transition: 'opacity 0.2s, color 0.2s',
      visibility: 'hidden',

      _hover: {
        color: 'error.dark'
      }
    },

    '&:hover': {
      borderColor: 'primary.main',

      '& .delete-slide-icon': {
        visibility: 'visible',
        opacity: 1
      }
    }
  }
}));

// -----------------------------
function SlideThumbItem({ active, slide = {}, classes }) {
  const { id, question = '', type, order = 1 } = slide;

  return (
    <Flex className={clsx(classes.thumbWrap, { active })} spacing={2}>
      {/* Order */}
      <Flex
        direction="column"
        justifyContent="space-between"
        className={classes.thumbLeft}
      >
        <Flex direction="column" center>
          <span>{order}</span>
          {active && (
            <Icon
              sx={{ color: 'primary.main', fs: 18 }}
              icon="material-symbols:play-arrow-rounded"
            />
          )}
        </Flex>
        <Flex direction="column" center>
          <Icon
            className="move-icon"
            icon="material-symbols:keyboard-arrow-up-rounded"
          />
          <Icon
            className="move-icon"
            icon="material-symbols:keyboard-arrow-down-rounded"
          />
        </Flex>
      </Flex>

      {/* Thumb box */}
      <Flex center direction="column" spacing={2} className={classes.thumbBox}>
        <Icon
          className="delete-slide-icon"
          icon="material-symbols:delete-forever"
        />
        <Icon
          sx={{ fs: 20, color: 'text.secondary' }}
          icon="bi:bar-chart-line-fill"
        />
        <Typography maxLine={1} fs={13} color="text.secondary" align="center">
          {question}
        </Typography>
      </Flex>
    </Flex>
  );
}

// -----------------------------
function SlideThumbs() {
  const classes = useStyles();

  return (
    <Flex spacing={4} direction="column" className={classes.root}>
      {Array(20)
        .fill(1)
        .map((_, i) => (
          <SlideThumbItem key={i} classes={classes} />
        ))}
    </Flex>
  );
}

export default SlideThumbs;
