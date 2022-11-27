import { Button, Flex, Input } from '@cads-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import groupApi from '~/apis/groupApi';
import { PATH } from '~/constant/path';
import { MAX } from '~/constant/validation';
import { getOriginPath } from '~/helper';

function JoinGroup({ flexProps = {} }) {
  const { isAuth } = useSelector((state) => state.user);
  const [joining, setJoining] = React.useState(false);
  const codeInput = React.useRef(null);
  const navigate = useNavigate();

  const handleJoinGroup = async (code) => {
    setJoining(true);
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
      toast.error('Mã lớp học hoặc liên kết không hợp lệ');
    }
    setJoining(false);
  };

  const handleCheckCode = () => {
    if (!isAuth) {
      return navigate(PATH.LOGIN);
    }

    const codeOrLink = codeInput.current?.value.trim() || '';
    if (!codeOrLink) return;

    const joinPath = getOriginPath(`${PATH.GROUP.JOIN}?code=`);
    const isLink = codeOrLink.startsWith(joinPath);
    let code = '';

    function toastInvalidCode() {
      toast.error('Mã lớp học hoặc liên kết không hợp lệ');
    }

    if (!isLink) {
      if (!codeOrLink || codeOrLink.length > MAX.GROUP_CODE) {
        return toastInvalidCode();
      }
      code = codeOrLink;
    } else {
      code = codeOrLink.replace(joinPath, '');
      if (code.length > MAX.GROUP_CODE) {
        return toastInvalidCode();
      }
    }

    handleJoinGroup(code);
  };

  return (
    <Flex center spacing={2} wrap {...flexProps}>
      <Input
        placeholder="Nhập mã lớp học hoặc liên kết"
        size="large"
        ref={codeInput}
      />
      <Button
        sx={{ flexShrink: 0 }}
        size="large"
        variant="soft"
        color="secondary"
        onClick={handleCheckCode}
        loading={joining}
      >
        {isAuth ? 'Tham gia' : 'Đăng nhập để tham gia'}
      </Button>
    </Flex>
  );
}

export default JoinGroup;
