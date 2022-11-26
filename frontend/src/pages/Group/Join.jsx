import { Flex } from '@cads-ui/core';
import React from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import groupApi from '~/apis/groupApi';
import ComponentLoading from '~/components/ComponentLoading';
import { PATH } from '~/constant/path';
import { MAX } from '~/constant/validation';

function JoinGroup() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();

  if (!code || code.length > MAX.GROUP_CODE) {
    return <Navigate to={PATH.HOME} />;
  }

  React.useEffect(() => {
    (async function () {
      try {
        const apiRes = await groupApi.postJoinGroup(code);
        if (apiRes.status === 200 || apiRes.status === 201) {
          if (apiRes.status === 201) {
            toast.success('Tham gia nhóm thành công');
          }
          const { groupId } = apiRes.data;
          return navigate(`${PATH.MANAGE_GROUP.ROOT}/${groupId}`);
        }
      } catch (error) {
        navigate(PATH.HOME);
        toast.error('Mã lớp học hoặc liên kết không hợp lệ');
      }
    })();
  }, []);

  return (
    <Flex center sx={{ w: '100vw', h: '100vh' }}>
      <ComponentLoading text="Đang kiểm tra nhóm ..." />
    </Flex>
  );
}

export default JoinGroup;
