import {
  Alert,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  makeStyles,
  Select,
  Switch,
  Typography
} from '@cads-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '~/components/Icon';
import { CHART_TYPES, SLIDE_TYPE_OPTIONS } from '~/constant/presentation';
import { MAX } from '~/constant/validation';
import useSelectorOnly from '~/hooks/useOnlySelector';
import { savePresentation } from '~/redux/slices/presentationSlice';

// -----------------------------
const useStyles = makeStyles((theme) => ({
  chartType: {
    p: 4,
    borderRadius: '8px',
    border: `solid 1px ${theme.palette.border.main}`,
    cursor: 'pointer',

    _hover: {
      borderColor: 'border.dark'
    },

    '&.active': {
      bgColor: 'primary.main',
      color: '#fff'
    }
  },
  closeIcon: {
    fs: 28,
    color: 'text.secondary',
    cursor: 'pointer',
    transition: 'color 0.2s',
    _hover: {
      color: 'error.main'
    }
  }
}));

// -----------------------------
function SlideOption({
  classes,
  option = {},
  showCorrectAnswer = false,
  onDelete,
  onChange
}) {
  const { isCorrect = false, value = '' } = option;

  return (
    <Flex spacing={2}>
      {showCorrectAnswer && (
        <Checkbox
          checked={isCorrect}
          sx={{ flexShrink: 0 }}
          size="large"
          color="success"
          onChange={(checked) => onChange('isCorrect', checked)}
        />
      )}
      <Input
        defaultValue={value}
        placeholder="Nhập lựa chọn"
        fullWidth
        debounceTime={500}
        onChange={(e) => onChange('value', e.target.value?.trim())}
      />
      <Icon
        className={classes.closeIcon}
        icon="material-symbols:close-rounded"
        onClick={onDelete}
      />
    </Flex>
  );
}

// -----------------------------
function SlideSettings() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const questionRef = React.useRef(null);
  const descRef = React.useRef(null);
  const prevSlideId = React.useRef('');

  const { slides = [], activeSlide } = useSelectorOnly('presentation', [
    'slides',
    'code',
    'activeSlide',
    'onlineCount'
  ]);

  const slide = slides[activeSlide - 1] || {};
  const { id, type, question, desc, options = [], settings = {} } = slide;
  const { showCorrectAnswer, chartType, showPercentage, multipleChoice } =
    settings;

  const saveUpdatedSlices = (key, value) => {
    // Prevent update when switch slide
    if (prevSlideId.current !== id) return;

    const updateSlides = JSON.parse(JSON.stringify(slides));
    updateSlides[activeSlide - 1][key] = value;
    dispatch(savePresentation({ slides: updateSlides }));
  };

  const handleDeleteOption = (order) => {
    const updateOptions = options.filter((o) => o.order !== order);
    saveUpdatedSlices('options', updateOptions);
  };

  const handleAddOption = () => {
    saveUpdatedSlices('options', [
      ...options,
      { value: '', isCorrect: false, order: Date.now() }
    ]);
  };

  const handleOptionValueChange = (order, field, value) => {
    const updateOptions = options.map((o) =>
      o.order === order ? { ...o, [field]: value } : o
    );
    saveUpdatedSlices('options', updateOptions);
  };

  const handleSettingChange = (field, value) => {
    saveUpdatedSlices('settings', { ...settings, [field]: value });
  };

  // Update value input
  React.useEffect(() => {
    questionRef.current.value = question;
  }, [question]);

  React.useEffect(() => {
    descRef.current.value = desc;
  }, [desc]);

  // Prevent update when switch slide
  React.useEffect(() => {
    prevSlideId.current = id;
  }, [id]);

  return (
    <Flex direction="column" spacing={5} sx={{ p: 4, overflowY: 'auto', h: 1 }}>
      {/* Slide type */}
      <Flex spacing={1} direction="column">
        <Typography fs={16} fw={500}>
          Loại slide
        </Typography>
        <Select
          value={type}
          fullWidth
          placeholder="Chọn loại câu hỏi"
          options={SLIDE_TYPE_OPTIONS}
          onChange={(val) => saveUpdatedSlices('type', val)}
        />
      </Flex>

      {/* question */}
      <Flex spacing={1} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="question">
          Câu hỏi
        </Typography>
        <Input
          ref={questionRef}
          id="question"
          fullWidth
          placeholder="Nhập câu hỏi"
          debounceTime={500}
          maxLength={MAX.PRESENTATION_NAME}
          onChange={(e) => saveUpdatedSlices('question', e.target.value.trim())}
        />
      </Flex>

      {/* desc */}
      <Flex spacing={1} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="desc">
          Mô tả
        </Typography>
        <Input
          ref={descRef}
          id="desc"
          fullWidth
          multiple
          placeholder="Nhập mô tả (nếu có)"
          debounceTime={500}
          maxLength={MAX.PRESENTATION_DESC}
          onChange={(e) => saveUpdatedSlices('desc', e.target.value.trim())}
        />
      </Flex>

      {/* options */}
      <Flex spacing={2} direction="column">
        <Typography fs={16} fw={500}>
          Câu trả lời
        </Typography>

        {options.map((option) => (
          <SlideOption
            key={option.order}
            option={option}
            classes={classes}
            showCorrectAnswer={showCorrectAnswer}
            onDelete={() => handleDeleteOption(option.order)}
            onChange={(field, value) =>
              handleOptionValueChange(option.order, field, value)
            }
          />
        ))}

        <Button
          startIcon={<Icon icon="mdi:plus" />}
          color="grey"
          onClick={handleAddOption}
        >
          Thêm tuỳ chọn
        </Button>

        {showCorrectAnswer && (
          <Alert type="info">
            Nhấp vào hộp bên cạnh một tùy chọn để đánh dấu nó là chính xác.
          </Alert>
        )}
      </Flex>

      {/* result layout */}
      <Flex sx={{ __mt: 10 }} spacing={1} direction="column">
        <Typography fs={16} fw={500}>
          Loại biểu đồ cho kết quả
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(CHART_TYPES).map((key) => (
            <Grid item xs={4} key={key}>
              <Flex
                center
                direction="column"
                className={clsx(classes.chartType, {
                  active: CHART_TYPES[key] === chartType
                })}
                onClick={() =>
                  handleSettingChange('chartType', CHART_TYPES[key])
                }
              >
                <Icon sx={{ fs: 28 }} icon="ic:baseline-bar-chart" />
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {CHART_TYPES[key]}
                </Typography>
              </Flex>
            </Grid>
          ))}
        </Grid>
      </Flex>

      {/* Extras */}
      <Flex sx={{ __mt: 10 }} spacing={2} direction="column">
        <Typography fs={16} fw={500}>
          Tuỳ chỉnh nâng cao
        </Typography>

        <Flex spacing={1} justifyContent="space-between">
          <Typography>Hiển thị câu trả lời đúng?</Typography>
          <Switch
            onChange={(checked) =>
              handleSettingChange('showCorrectAnswer', checked)
            }
            checked={showCorrectAnswer}
          />
        </Flex>

        <Flex spacing={1} justifyContent="space-between">
          <Typography>Hiển thị kết quả theo tỷ lệ phần trăm?</Typography>
          <Switch
            onChange={(checked) =>
              handleSettingChange('showPercentage', checked)
            }
            checked={showPercentage}
          />
        </Flex>

        <Flex spacing={1} justifyContent="space-between">
          <Typography>Cho phép chọn nhiều đáp án?</Typography>
          <Flex spacing={1}>
            {multipleChoice > 1 && (
              <Input
                type="number"
                sx={{ w: 60 }}
                min={2}
                max={options.length}
                defaultValue={multipleChoice}
                debounceTime={500}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 2) handleSettingChange('multipleChoice', value);
                  else e.target.value = 2;
                }}
              />
            )}
            <Switch
              onChange={(checked) =>
                handleSettingChange('multipleChoice', checked ? 2 : 1)
              }
              checked={multipleChoice > 1}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SlideSettings;
