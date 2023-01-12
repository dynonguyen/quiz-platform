import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  registerables,
  Title,
  Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'react-chartjs-2';
import { CHART_COLORS, CHART_TYPES } from '~/constant/presentation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  ChartDataLabels,
  Title,
  Legend,
  Tooltip,
  ...registerables
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
      const optionIndex = options.findIndex((o) => o._id === choice);
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

export default SlideResultChart;
