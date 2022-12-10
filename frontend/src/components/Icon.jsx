import { withSx } from '@cads-ui/core';
import { Icon as Iconify } from '@iconify/react';

const Icon = withSx((props) => {
  const { className, ...other } = props;

  return <Iconify className={className} {...other} />;
});

export default Icon;
