import { generateUniqueString } from '~/helper';
import { CHART_TYPES, SLIDE_TYPES } from './presentation';

export const DEFAULTS = {
  SLIDE: () => ({
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
      multipleChoice: 1
    }
  })
};
