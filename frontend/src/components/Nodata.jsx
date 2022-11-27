import { PageResult } from '@cads-ui/core';
import nodataSrc from '~/assets/img/nodata.svg';

function Nodata({ pageResultProps = {} }) {
  return (
    <PageResult
      variant="no-data"
      illustration={<img src={nodataSrc} style={{ width: '120px' }} />}
      action={<></>}
      title="Không có dữ liệu"
      {...pageResultProps}
    />
  );
}

export default Nodata;
