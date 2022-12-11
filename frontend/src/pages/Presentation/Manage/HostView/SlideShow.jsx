import { Badge, Box, Flex, makeStyles, Typography } from '@cads-ui/core';
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
import Icon from '~/components/Icon';
import { CHART_COLORS, CHART_TYPES } from '~/constant/presentation';
import useSelectorOnly from '~/hooks/useOnlySelector';

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

const chartOptions = (type, showLabel = false, showPercent = false) => {
  const options = { responsive: true, maintainAspectRatio: false };
  const plugins = {};

  if (type === CHART_TYPES.BAR) {
    Object.assign(options, {
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 18 } } },
        y: { display: false }
      }
    });
  }

  // Legend
  const showLegend = type === CHART_TYPES.PIE || type === CHART_TYPES.DONUT;
  Object.assign(plugins, {
    legend: showLegend
      ? { position: 'top', align: 'center', font: { size: 20 } }
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

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: { p: 6, bgColor: 'grey.300', h: 1 },

  slide: {
    bgColor: 'background.default',
    w: 1,
    h: 1,
    shadow: 3,
    p: 4,
    position: 'relative'
  },

  chartWrap: {
    p: 4,
    w: '80%',
    margin: '0px auto',
    flexGrow: 1,
    maxH: 1,
    overflow: 'hidden',
    position: 'relative'
  },

  userOnlineWrap: {
    position: 'absolute',
    bottom: '16px',
    right: '24px'
  },
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
function SlideResultChart({ slide }) {
  const { options = [], answers = [], settings = {} } = slide;
  const { chartType = CHART_TYPES.BAR, showPercentage } = settings;
  const showResult = true;
  const result = calcResult(options, answers);

  const data = {
    labels: options.map((o) => o.value),
    datasets: [{ data: result, backgroundColor: CHART_COLORS }]
  };

  return (
    <Chart
      type={chartType}
      options={chartOptions(chartType, showResult, showPercentage)}
      data={data}
    />
  );
}

// -----------------------------
function SlideShow() {
  const classes = useStyles();
  const slideRef = React.useRef(null);
  const {
    slides = [],
    code,
    activeSlide,
    onlineCount
  } = useSelectorOnly('presentation', [
    'slides',
    'code',
    'activeSlide',
    'onlineCount'
  ]);
  const slide = slides[activeSlide - 1] || {};

  // Change size when window resize
  React.useEffect(() => {
    function calcRatioHeight() {
      if (slideRef.current) {
        const { width } = slideRef.current.getBoundingClientRect();
        const height = width / SLIDE_RATIO;
        slideRef.current.style.height = `${height}px`;
      }
    }

    calcRatioHeight();

    window.addEventListener('resize', calcRatioHeight);
    return () => window.removeEventListener('resize', calcRatioHeight);
  }, []);

  return (
    <div className={classes.root}>
      <Flex
        spacing={4}
        direction="column"
        className={classes.slide}
        ref={slideRef}
      >
        <Typography fs={20} align="center" color="text.secondary">
          Mã tham dự trình chiếu <strong>{code}</strong>
        </Typography>

        <Box>
          <Typography fs={20} align="center">
            {slide.question}
          </Typography>

          {slide.desc && (
            <Typography fs={15} color="text.secondary" align="center">
              {slide.desc}
            </Typography>
          )}
        </Box>

        {/* Chart result */}
        <Flex center className={classes.chartWrap}>
          <SlideResultChart slide={slide} />
        </Flex>

        {/* Online user */}
        <Box className={classes.userOnlineWrap}>
          <Badge content={onlineCount}>
            <Flex center className={classes.userOnline}>
              <Icon sx={{ fs: 20 }} icon="mdi:user" />
            </Flex>
          </Badge>
        </Box>
      </Flex>
    </div>
  );
}

export default SlideShow;
