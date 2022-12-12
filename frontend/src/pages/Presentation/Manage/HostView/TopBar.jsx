import {
  Avatar,
  Button,
  Divider,
  Flex,
  makeStyles,
  Spinner,
  Tooltip,
  Typography
} from '@cads-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Icon from '~/components/Icon';
import { PATH } from '~/constant/path';
import useSelectorOnly from '~/hooks/useOnlySelector';
import { savePresentation } from '~/redux/slices/presentationSlice';

// -----------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    py: 3,
    px: 4,
    h: 1,
    borderBottom: `solid 1px ${theme.palette.border.main}`
  },
  icon: {
    fs: 24,
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  actionBtn: {
    [theme.breakpoints.down('md')]: {
      minW: 'unset',
      '& .cads-button-icon': {
        margin: 0,
        '& + span': {
          display: 'none'
        }
      }
    }
  }
}));

// -----------------------------
function Saved() {
  const classes = useStyles();
  const { saving } = useSelectorOnly('presentation', ['saving']);

  return (
    <Flex spacing={2}>
      {saving ? (
        <Spinner color="grey" />
      ) : (
        <Icon
          className={classes.icon}
          sx={{ color: 'success.light' }}
          icon="material-symbols:done"
        />
      )}
      <Typography
        sx={{ display: 'none' }}
        md={{ sx: { display: 'block' } }}
        color="grey.600"
      >
        {saving ? 'Đang lưu ...' : 'Đã lưu'}
      </Typography>
    </Flex>
  );
}

// -----------------------------
function HostViewTopBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { name, createdAt, code, slides, activeSlide } = useSelectorOnly(
    'presentation',
    ['name', 'createdAt', 'code', 'slides', 'activeSlide']
  );
  const dispatch = useDispatch();

  const handleCopyCode = () => {
    navigator?.clipboard?.writeText(
      `${window.location.origin}/${PATH.PRESENTATION.ROOT}/${code}`
    );
    toast.success('Đã sao chép liên kết chia sẻ vào clipboard');
  };

  const startPresent = () => {
    const isMobile = window.innerWidth < 767;
    if (isMobile) {
      return toast.error(
        'Xin lỗi, ứng dụng chưa hỗ trợ chế độ trình chiều trên thiết bị di động !'
      );
    }
    if (!slides || !slides.length) {
      return toast.warning(
        'Bạn chưa có slide nào, vui lòng tạo slide trước khi trình chiếu !'
      );
    }

    dispatch(
      savePresentation({
        isPresenting: true,
        currentSlide: slides[activeSlide - 1]?.id || slides[0].id
      })
    );
  };

  return (
    <Flex justifyContent="space-between" className={classes.root}>
      {/* Left side */}
      <Flex spacing={4}>
        <Tooltip
          title="Quay lại trang trình chiếu của tôi"
          placement="bottom-start"
        >
          <Link to={PATH.PRESENTATION.ROOT}>
            <Icon
              className={classes.icon}
              sx={{ _hover: { color: 'text.secondary' } }}
              icon="material-symbols:arrow-back-rounded"
            />
          </Link>
        </Tooltip>
        <Flex direction="column" spacing={0.5}>
          <Typography fs={18}>{name}</Typography>
          <Typography fs={12} color="text.secondary" variant="caption">
            Tạo ngày&nbsp;{moment(createdAt).format('DD-MM-YYYY')}
          </Typography>
        </Flex>
      </Flex>

      {/* Right side */}
      <Flex spacing={2} md={{ spacing: 5 }}>
        <Saved />
        <Divider orientation="vertical" />
        <Avatar
          sx={{ display: 'none' }}
          md={{ sx: { display: 'flex' } }}
          src={user.avt}
          alt={user.name}
        />
        <Button
          size="small"
          md={{ size: 'medium' }}
          className={classes.actionBtn}
          startIcon={<Icon icon="material-symbols:share" />}
          color="grey"
          onClick={handleCopyCode}
        >
          Chia sẻ
        </Button>
        <Button
          size="small"
          md={{ size: 'medium' }}
          className={classes.actionBtn}
          startIcon={<Icon icon="material-symbols:play-arrow-rounded" />}
          color="primary"
          onClick={startPresent}
        >
          Trình chiếu
        </Button>
      </Flex>
    </Flex>
  );
}

export default HostViewTopBar;
