export const SLIDE_TYPES = {
  MULTIPLE_CHOICE: 'multiple',
  PARAGRAPH: 'paragraph',
  HEADING: 'heading'
};

export const SLIDE_TYPE_OPTIONS = [
  {
    value: SLIDE_TYPES.MULTIPLE_CHOICE,
    label: 'Multiple choice'
  },
  {
    value: SLIDE_TYPES.PARAGRAPH,
    label: 'Paragraph'
  },
  {
    value: SLIDE_TYPES.HEADING,
    label: 'Heading'
  }
];

export const SLIDE_TYPE_ICONS = {
  [SLIDE_TYPES.MULTIPLE_CHOICE]: 'material-symbols:bar-chart'
};

export const CHART_TYPES = {
  BAR: 'bar',
  DONUT: 'doughnut',
  PIE: 'pie'
};

export const CHART_COLORS = [
  '#2065D1',
  '#ff476e',
  '#ff9730',
  '#32c9c9',
  '#ffc234',
  '#229A16',
  '#74CAFF',
  '#B72136',
  '#1E1E2E',
  '#FFA48D'
];
