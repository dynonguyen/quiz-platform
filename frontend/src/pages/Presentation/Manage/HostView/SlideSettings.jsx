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
import Icon from '~/components/Icon';

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
function SlideOption({ classes }) {
  return (
    <Flex spacing={2}>
      <Checkbox sx={{ flexShrink: 0 }} size="large" color="success" />
      <Input placeholder="Tuỳ chọn 1" fullWidth />
      <Icon
        className={classes.closeIcon}
        icon="material-symbols:close-rounded"
      />
    </Flex>
  );
}

// -----------------------------
function SlideSettings() {
  const classes = useStyles();

  return (
    <Flex direction="column" spacing={5} sx={{ p: 4, overflowY: 'auto', h: 1 }}>
      {/* Slide type */}
      <Flex spacing={1} direction="column">
        <Typography fs={16} fw={500}>
          Loại slide
        </Typography>
        <Select
          fullWidth
          placeholder="Chọn loại câu hỏi"
          options={[{ label: 'Multiple choice', value: 1 }]}
        />
      </Flex>

      {/* question */}
      <Flex spacing={1} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="question">
          Câu hỏi
        </Typography>
        <Input id="question" fullWidth placeholder="Nhập câu hỏi" />
      </Flex>

      {/* desc */}
      <Flex spacing={1} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="desc">
          Mô tả
        </Typography>
        <Input id="desc" fullWidth multiple placeholder="Nhập mô tả (nếu có)" />
      </Flex>

      {/* options */}
      <Flex spacing={2} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="desc">
          Câu trả lời
        </Typography>

        <SlideOption classes={classes} />

        <Button
          startIcon={<Icon icon="mdi:plus" />}
          color="grey"
          variant="soft"
        >
          Thêm tuỳ chọn
        </Button>

        <Alert type="info">
          Nhấp vào hộp bên cạnh một tùy chọn để đánh dấu nó là chính xác.
        </Alert>
      </Flex>

      {/* result layout */}
      <Flex sx={{ __mt: 10 }} spacing={1} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="desc">
          Loại biểu đồ cho kết quả
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Flex
              center
              direction="column"
              className={clsx(classes.chartType, 'active')}
            >
              <Icon sx={{ fs: 28 }} icon="ic:baseline-bar-chart" />
              <Typography variant="h5">Bars</Typography>
            </Flex>
          </Grid>

          <Grid item xs={4}>
            <Flex center direction="column" className={clsx(classes.chartType)}>
              <Icon sx={{ fs: 28 }} icon="ic:round-donut-small" />
              <Typography variant="h5">Donut</Typography>
            </Flex>
          </Grid>
        </Grid>
      </Flex>

      {/* Extras */}
      <Flex sx={{ __mt: 10 }} spacing={2} direction="column">
        <Typography fs={16} fw={500} component="label" htmlFor="desc">
          Tuỳ chỉnh nâng cao
        </Typography>

        <Flex spacing={1} justifyContent="space-between">
          <Typography>Hiển thị câu trả lời đúng?</Typography>
          <Switch />
        </Flex>

        <Flex spacing={1} justifyContent="space-between">
          <Typography>Hiển thị kết quả theo tỷ lệ phần trăm?</Typography>
          <Switch />
        </Flex>

        <Flex spacing={1} justifyContent="space-between">
          <Typography>Cho phép chọn nhiều đáp án?</Typography>
          <Switch />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SlideSettings;
