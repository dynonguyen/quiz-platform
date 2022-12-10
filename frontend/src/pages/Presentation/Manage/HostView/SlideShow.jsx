import { Badge, Box, Flex, makeStyles, Typography } from '@cads-ui/core';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Icon from '~/components/Icon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: { p: 8, bgColor: 'grey.300', h: 1 },
  slide: {
    bgColor: 'background.default',
    w: 1,
    h: 1,
    shadow: 3,
    p: 4,
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
function SlideResultChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 2',
        data: [1, 4, 5, 6, 7, 2, 4],
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  return <Bar options={options} data={data} />;
}

// -----------------------------
function SlideShow() {
  const classes = useStyles();
  const slideRef = React.useRef(null);

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
      <div className={classes.slide} ref={slideRef}>
        <Typography fs={20} align="center">
          Mã tham dự trình chiếu <strong>19210143</strong>
        </Typography>

        <Typography fs={20} sx={{ my: 3 }} align="center">
          Test slide
        </Typography>

        <Flex center sx={{ p: 4, w: '80%', margin: '0px auto' }}>
          <SlideResultChart />
        </Flex>

        {/* Online user */}
        <Box className={classes.userOnlineWrap}>
          <Badge content={1}>
            <Flex center className={classes.userOnline}>
              <Icon sx={{ fs: 20 }} icon="mdi:user" />
            </Flex>
          </Badge>
        </Box>
      </div>
    </div>
  );
}

export default SlideShow;
