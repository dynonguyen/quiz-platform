import { PageResult } from '@cads-ui/core';
import errorImgSrc from '~/assets/img/internal-error.svg';

function ServerError() {
  return <PageResult variant="500" illustration={<img src={errorImgSrc} />} />;
}

export default ServerError;
