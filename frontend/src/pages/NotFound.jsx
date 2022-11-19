import { Button, PageResult } from '@cads-ui/core';
import { Link } from 'react-router-dom';
import notFoundSrc from '~/assets/img/not-found.svg';
import { PATH } from '~/constant/path';

function NotFoundPage() {
  return (
    <PageResult
      variant="404"
      title="Không tìm thấy trang"
      subTitle="Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã nhập sai URL? Hãy chắc chắn kiểm tra chính tả của bạn."
      action={
        <Link to={PATH.HOME}>
          <Button>Về trang chủ</Button>
        </Link>
      }
      illustration={<img src={notFoundSrc} />}
    />
  );
}

export default NotFoundPage;
