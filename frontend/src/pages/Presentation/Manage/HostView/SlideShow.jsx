import {
  Badge,
  Box,
  Button,
  Flex,
  makeStyles,
  Typography,
  useEffectNotFirst
} from '@cads-ui/core';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Chart } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Icon from '~/components/Icon';
import { CHART_COLORS, CHART_TYPES } from '~/constant/presentation';
import { openFullscreen } from '~/helper';
import useSelectorOnly from '~/hooks/useOnlySelector';
import { savePresentation } from '~/redux/slices/presentationSlice';

// -----------------------------
const useStyles = makeStyles((_) => ({
  root: (props) => ({
    p: props.fullscreen ? 0 : 6,
    bgColor: 'grey.300',
    h: 1
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
  }
}));

// -----------------------------
const SLIDE_RATIO = 16 / 9;

// -----------------------------
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  ChartDataLabels,
  Title,
  Legend,
  Tooltip
);

const chartOptions = (
  type,
  showLabel = false,
  showPercent = false,
  isPresenting = false
) => {
  const options = { responsive: true, maintainAspectRatio: false };
  const plugins = {};

  if (type === CHART_TYPES.BAR) {
    Object.assign(options, {
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: isPresenting ? 28 : 18 } }
        },
        y: { display: false }
      }
    });
  }

  // Legend
  const showLegend = type === CHART_TYPES.PIE || type === CHART_TYPES.DONUT;
  Object.assign(plugins, {
    legend: showLegend
      ? {
          position: 'top',
          align: 'center',
          labels: { font: { size: 18 } }
        }
      : { display: false }
  });

  // data label
  Object.assign(plugins, {
    datalabels: showLabel
      ? {
          anchor: 'center',
          align: 'center',
          color: '#fff',
          font: { size: 18, weight: 500 },
          formatter: showPercent
            ? (value, context) => {
                const data = Array.from(context.dataset?.data) || [];
                const total = data.reduce((s, d) => s + d, 0);
                return `${((value * 100) / total).toFixed(0)}%`;
              }
            : null
        }
      : { display: false }
  });

  // Add plugin option
  Object.assign(options, { plugins });

  return options;
};

function calcResult(options = [], answers = []) {
  const result = Array(options.length).fill(0);

  answers.forEach((ans) => {
    const { choices = [] } = ans;
    choices.forEach((choice) => {
      const optionIndex = options.findIndex((o) => o.value === choice);
      if (optionIndex !== -1) {
        result[optionIndex]++;
      }
    });
  });

  return result;
}

// -----------------------------
function SlideResultChart({ slide, isPresenting }) {
  const { options = [], answers = [], settings = {} } = slide;
  const { chartType = CHART_TYPES.BAR, showPercentage } = settings;
  const result = calcResult(options, answers);

  const data = {
    labels: options.map((o) => o.value),
    datasets: [{ data: result, backgroundColor: CHART_COLORS }]
  };

  return (
    <Chart
      type={chartType}
      options={chartOptions(chartType, true, showPercentage, isPresenting)}
      data={data}
    />
  );
}

// -----------------------------
function SlideShowControl({ activeSlide, currentSlide, slides }) {
  const dispatch = useDispatch();

  const handleNextSlide = () => {
    // TODO: handle next slide
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
    // TODO: handle prev slide
    if (activeSlide === 1) {
      return;
    }
    const prevSlide = slides[activeSlide - 2];
    dispatch(
      savePresentation({
        currentSlide: prevSlide.id,
        activeSlide: activeSlide - 1
      })
    );
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
        <Button isFab size="large" color="#444" onClick={handlePrevSlide}>
          <Icon icon="material-symbols:chevron-left-rounded" />
        </Button>
        <Button isFab size="large" color="#444" onClick={handleNextSlide}>
          <Icon icon="material-symbols:chevron-right-rounded" />
        </Button>
      </Flex>
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
  const dispatch = useDispatch();
  const slide = slides[activeSlide - 1] || {};

  const calcRatioHeight = () => {
    if (slideRef.current) {
      const { width } = slideRef.current.getBoundingClientRect();
      const height = width / SLIDE_RATIO;
      slideRef.current.style.height = `${height}px`;
    }
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

  return (
    <div className={classes.root} ref={wrapper}>
      <Flex
        spacing={4}
        direction="column"
        className={classes.slide}
        ref={slideRef}
      >
        <Box>
          <Typography fs={isPresenting ? 40 : 28} align="center">
            {slide.question}
          </Typography>

          {slide.desc && (
            <Typography
              fs={isPresenting ? 28 : 18}
              color="text.secondary"
              align="center"
            >
              {slide.desc}
            </Typography>
          )}
        </Box>

        {/* Chart result */}
        <Flex center className={classes.chartWrap}>
          <SlideResultChart slide={slide} isPresenting={isPresenting} />
        </Flex>

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
      </Flex>

      {/* Slide show control */}
      {isPresenting && (
        <SlideShowControl
          slides={slides}
          activeSlide={activeSlide}
          currentSlide={currentSlide}
        />
      )}
    </div>
  );
}

export default SlideShow;
