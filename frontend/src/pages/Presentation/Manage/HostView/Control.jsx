import { Button, Flex, makeStyles } from '@cads-ui/core';
import Icon from '~/components/Icon';

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

  return (
    <Flex className={classes.root} justifyContent="space-between">
      <Button variant="soft" startIcon={<Icon icon="mdi:plus" />}>
        Tạo slide
      </Button>
      <Button
        variant="text"
        color="grey"
        startIcon={<Icon icon="material-symbols:settings-rounded" />}
      >
        Cài đặt
      </Button>
    </Flex>
  );
}

export default HostViewControl;
