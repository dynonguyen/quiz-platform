import {
  alpha,
  Button,
  Dialog,
  Flex,
  makeStyles,
  Typography
} from '@cads-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '~/components/Icon';
import { SLIDE_TYPE_ICONS } from '~/constant/presentation';
import useSelectorOnly from '~/hooks/useOnlySelector';
import {
  savePresentation,
  updatePresentation
} from '~/redux/slices/presentationSlice';

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
      zIndex: 3,
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
function SlideThumbItem(props) {
  const {
    slide,
    order,
    isActive,
    isPresent,
    classes,
    moveSlide,
    onClick,
    onDelete
  } = props;
  const {
    id,
    type,
    question = '',
    name,
    settings = {},
    options = [],
    answers = []
  } = slide;
  const [openDelModal, setOpenDelModal] = React.useState(false);

  return (
    <Flex className={clsx(classes.thumbWrap, { active: isActive })} spacing={2}>
      {/* Order */}
      <Flex
        direction="column"
        justifyContent="space-between"
        className={classes.thumbLeft}
      >
        <Flex direction="column" center>
          <span>{order}</span>
          {isPresent && (
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
            onClick={() => moveSlide(true)}
          />
          <Icon
            className="move-icon"
            icon="material-symbols:keyboard-arrow-down-rounded"
            onClick={() => moveSlide(false)}
          />
        </Flex>
      </Flex>

      {/* Thumb box */}
      <Flex
        center
        direction="column"
        spacing={2}
        className={classes.thumbBox}
        onClick={onClick}
      >
        <Icon
          className="delete-slide-icon"
          icon="material-symbols:delete-forever"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDelModal(true);
          }}
        />
        {SLIDE_TYPE_ICONS[type] && (
          <Icon
            sx={{ fs: 20, color: 'text.secondary' }}
            icon={SLIDE_TYPE_ICONS[type]}
          />
        )}
        <Typography maxLine={1} fs={13} color="text.secondary" align="center">
          {question}
        </Typography>
      </Flex>

      {/* Delete slide modal */}
      <Dialog
        open={openDelModal}
        alertType="warning"
        header="Xoá slide"
        hideDivider
        onClose={() => setOpenDelModal(false)}
        body={
          <Typography
            align="center"
            color="text.secondary"
            sx={{ lineHeight: 1.75 }}
          >
            Bạn có chắc muốn xoá slide <b>{question}</b> ?
            <br />
            Thao tác này không thể phục hồi.
          </Typography>
        }
        action={
          <Flex spacing={2}>
            <Button color="grey" onClick={() => setOpenDelModal(false)}>
              Huỷ bỏ
            </Button>
            <Button
              color="error"
              onClick={() => {
                setOpenDelModal(false);
                onDelete();
              }}
            >
              Xoá
            </Button>
          </Flex>
        }
      />
    </Flex>
  );
}

// -----------------------------
function SlideThumbs() {
  const classes = useStyles();
  const {
    slides = [],
    currentSlide,
    activeSlide
  } = useSelectorOnly('presentation', [
    'slides',
    'currentSlide',
    'activeSlide'
  ]);
  const totalSlides = slides.length;
  const dispatch = useDispatch();

  const moveSlide = (isUp = false, slideId, order) => {
    if ((isUp && order > 1) || (!isUp && order < totalSlides)) {
      const updateSlides = JSON.parse(JSON.stringify(slides));
      const swapIndex = isUp ? order - 2 : order;

      [updateSlides[order - 1], updateSlides[swapIndex]] = [
        updateSlides[swapIndex],
        updateSlides[order - 1]
      ];

      dispatch(savePresentation({ slides: updateSlides }));
    }
  };

  const handleSlideClick = (order) => {
    dispatch(updatePresentation({ activeSlide: order }));
  };

  const handleDeleteSlide = (slideId) => {
    dispatch(
      savePresentation({ slides: slides.filter((s) => s.id !== slideId) })
    );
  };

  return (
    <Flex spacing={4} direction="column" className={classes.root}>
      {slides.map((slide, index) => {
        const order = index + 1;
        const slideId = slide.id;

        return (
          <SlideThumbItem
            key={slideId}
            slide={slide}
            order={order}
            isActive={activeSlide === order}
            isPresent={currentSlide === slideId}
            classes={classes}
            totalSlides={totalSlides}
            moveSlide={(isUp) => moveSlide(isUp, slideId, order)}
            onClick={() => handleSlideClick(order)}
            onDelete={() => handleDeleteSlide(slideId)}
          />
        );
      })}
    </Flex>
  );
}

export default SlideThumbs;
