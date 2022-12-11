const { generateUniqueString } = require('~/helper');
const { CHART_TYPES, SLIDE_TYPES } = require('.');

const DEFAULTS = {
  SLIDE: {
    id: generateUniqueString(20),
    type: SLIDE_TYPES.MULTIPLE_CHOICE,
    question: '',
    desc: '',
    options: [],
    answers: [],
    settings: {
      chartType: CHART_TYPES.BAR,
      showCorrectAnswer: false,
      showPercentage: false,
      multipleChoice: 1,
    },
  },
};

module.exports = DEFAULTS;
