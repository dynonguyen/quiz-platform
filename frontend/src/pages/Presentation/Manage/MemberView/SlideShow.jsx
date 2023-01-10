import {
  Box,
  Flex,
  makeStyles,
  Typography,
  useMediaQuery
} from '@cads-ui/core';
import { Icon } from '@iconify/react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import goodSrc from '~/assets/img/good.png';
import useSelectorOnly from '~/hooks/useOnlySelector';
import { savePresentation } from '~/redux/slices/presentationSlice';

import { getOptionValue } from '~/helper';
// -----------------------------
const useStyles = makeStyles((_) => ({
  slide: {
    w: 1,
    h: 1,
    p: 4,
    shadow: 3,
    bgColor: 'background.default'
  },

  option: {
    p: 1,
    m: 3,
    border: '1px solid #dddddd',
    borderRadius: '5px'
  },

  checked: {
    border: '1px solid #1976d2'
  }
}));

// -----------------------------

function Answer({ classes, value, multipleChoice }) {
  return (
    <FormControlLabel
      className={`${classes.option} ${classes.checked}`}
      control={
        multipleChoice > 1 ? (
          <Checkbox
            checked
            value={value}
            name={value}
            size="medium"
            color="primary"
          />
        ) : (
          <Radio
            checked
            value={value}
            name={value}
            size="medium"
            color="primary"
          />
        )
      }
      label={value}
    />
  );
}
// ----------------
function SlideOption({
  classes,
  option = {},
  selected,
  multipleChoice,
  onChange,
  name
}) {
  return (
    <FormControlLabel
      className={`${classes.option} ${
        selected === option.value ? classes.checked : ''
      }`}
      control={
        multipleChoice > 1 ? (
          <Checkbox
            checked={selected[option._id]}
            onChange={onChange}
            value={option._id}
            name={option.value}
            size="medium"
            color="primary"
          />
        ) : (
          <Radio
            checked={selected === option._id}
            onChange={onChange}
            value={option._id}
            name={name}
            size="medium"
            color="primary"
          />
        )
      }
      label={option.value}
    />
  );
}
// -----------------------------

function WaitingForNextSlide({
  isEndOfPresentation,
  classes,
  listChoices,
  slide
}) {
  let message;
  if (isEndOfPresentation) {
    message = 'Bạn đã trả lời toàn bộ các câu hỏi';
  } else {
    message = 'Bạn đã trả lời câu hỏi này, hãy đợi chuyển sang câu kế tiếp nhé';
  }
  const isMobile = useMediaQuery({ down: 'sm' });
  return (
    <>
      <Flex sx={{ w: 1, maxW: 500 }} direction="column" alignItems="stretch">
        <Typography fs={20} color="text.secondary" sx={{ ml: 3 }}>
          Câu trả lời của bạn
        </Typography>
        <FormGroup>
          {listChoices?.map((choice) => (
            <Answer
              key={choice._id}
              classes={classes}
              value={choice.value}
              multipleChoice={slide.settings.multipleChoice}
            />
          ))}
        </FormGroup>
      </Flex>
      <Flex center direction="column" spacing={10} sx={{ flex: 1 }}>
        <Typography fs={24} color="text.secondary">
          {message}
        </Typography>
        <img src={goodSrc} alt="done" width={isMobile ? '70%' : '250px'} />
      </Flex>
    </>
  );
}

const isMultipleChoice = (number) => {
  return number > 1 ? new Set() : [];
};

// -----------------------------
function MemberSlideShow() {
  const {
    slides = [],
    code,
    activeSlide,
    currentSlide,
    userId
  } = useSelectorOnly('presentation', [
    'slides',
    'code',
    'activeSlide',
    'currentSlide',
    'userId'
  ]);

  const [isAnswered, setIsAnswered] = useState(false);
  const [listChoices, setListChoices] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const prevSlideId = useRef('');
  const slide = slides[activeSlide - 1] || {};
  const [selected, setSelected] = useState(
    isMultipleChoice(slide.settings.multipleChoice)
  );

  //creating function to load ip address from the API
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   if (userId) setUser(userId);
  //   else setUser(res.data.IPv4);
  // };

  const checkAnswered = () => {
    const choices = slides[activeSlide - 1].answers?.filter(
      (answer) => answer.userId === userId
    )[0]?.choices;
    if (choices?.length > 0)
      setListChoices(getOptionValue(slide.options, choices));
    if (Boolean(choices)) setIsAnswered(true);
    else setIsAnswered(false);
  };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);

  useEffect(() => {
    prevSlideId.current = slide.id;
  }, [slide.id]);

  useEffect(() => {
    checkAnswered();
  }, []);

  useEffect(() => {
    checkAnswered();
  }, [currentSlide]);

  useEffect(() => {
    checkAnswered();
  }, [slide.answers]);

  const handleChange = (event) => {
    let choices = selected;
    if (slide.settings.multipleChoice > 1) {
      if (choices.size > 0 && choices.has(event.target.value))
        choices.delete(event.target.value);
      else choices.add(event.target.value);
    } else choices = event.target.value;
    setSelected(choices);
  };

  const saveUpdatedSlices = async (key, value) => {
    try {
      // Prevent update when switch slide
      if (prevSlideId.current !== slide.id) return;

      const updateSlides = JSON.parse(JSON.stringify(slides));
      updateSlides[activeSlide - 1][key] = value;
      dispatch(
        savePresentation({
          slides: updateSlides,
          slideId: slide.id,
          userId: userId,
          updateAnswers: true
        })
      );
      setIsAnswered(true);
      toast.success(res.data?.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  };

  const handleAddAnswer = () => {
    let choices;
    if (slide.settings.multipleChoice > 1) choices = Array.from(selected);
    else choices = [selected];
    saveUpdatedSlices('answers', [
      ...slide.answers,
      { userId: userId, choices: choices }
    ]);
  };

  const isEnd = currentSlide === slides[slides.length - 1].id;
  return (
    <Flex
      spacing={4}
      direction="column"
      className={classes.slide}
      alignItems="center"
    >
      <Box>
        <Typography fs={28} align="center">
          {slide.question}
        </Typography>

        {slide.desc && (
          <Typography fs={18} color="text.secondary" align="center">
            {slide.desc}
          </Typography>
        )}
      </Box>
      {isAnswered ? (
        <WaitingForNextSlide
          classes={classes}
          isEndOfPresentation={isEnd}
          listChoices={listChoices}
          slide={slide}
        />
      ) : (
        <Flex
          sx={{ flex: 1, w: 1, maxW: 500 }}
          direction="column"
          alignItems="stretch"
        >
          <FormGroup>
            {slide.options.map((option) => (
              <SlideOption
                key={option.order}
                option={option}
                selected={selected}
                classes={classes}
                onChange={handleChange}
                name={slide.question}
                multipleChoice={slide.settings.multipleChoice}
              />
            ))}
          </FormGroup>
          <Button
            sx={{ m: 3 }}
            size="large"
            variant="contained"
            onClick={handleAddAnswer}
            endIcon={
              <Icon icon="material-symbols:arrow-circle-right-outline-rounded" />
            }
          >
            Chọn
          </Button>
        </Flex>
      )}
      {/* Presentation code */}
      <Typography fs={20} align="center" color="text.secondary">
        Mã tham dự trình chiếu <strong>{code}</strong>
      </Typography>
    </Flex>
  );
}

export default MemberSlideShow;