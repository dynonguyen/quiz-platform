import { Button, Flex, makeStyles } from '@cads-ui/core';
import { useDispatch } from 'react-redux';
import Icon from '~/components/Icon';
import { DEFAULTS } from '~/constant/default';
import useSelectorOnly from '~/hooks/useOnlySelector';
import {
  savePresentation,
  updatePresentation
} from '~/redux/slices/presentationSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    py: 3,
    px: 4,
    h: 1,
    borderBottom: `solid 1px ${theme.palette.border.main}`
  }
}));

function HostViewControl() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openMobileSetting, slides } = useSelectorOnly('presentation', [
    'openMobileSetting',
    'slides'
  ]);

  const handleCreateSlide = () => {
    dispatch(savePresentation({ slides: [...slides, DEFAULTS.SLIDE()] }));
  };

  return (
    <Flex className={classes.root} justifyContent="space-between">
      <Button startIcon={<Icon icon="mdi:plus" />} onClick={handleCreateSlide}>
        Tạo slide
      </Button>
      <Button
        md={{ sx: { display: 'none' } }}
        variant={openMobileSetting ? 'soft' : 'text'}
        color={openMobileSetting ? 'success' : 'grey'}
        startIcon={
          openMobileSetting ? (
            <Icon icon="material-symbols:done" />
          ) : (
            <Icon icon="material-symbols:settings-rounded" />
          )
        }
        onClick={() =>
          dispatch(
            updatePresentation({ openMobileSetting: !openMobileSetting })
          )
        }
      >
        {openMobileSetting ? 'Hoàn thành cài đặt' : 'Cài đặt'}
      </Button>
    </Flex>
  );
}

export default HostViewControl;
