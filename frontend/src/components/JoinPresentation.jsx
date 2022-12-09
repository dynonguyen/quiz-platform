import { Button, Flex, Input, Typography } from '@cads-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import presentationApi from '~/apis/presentationApi';
import { PATH } from '~/constant/path';
import { MAX } from '~/constant/validation';

function JoinPresentation({ flexProps = {} }) {
  const [joining, setJoining] = React.useState(false);
  const codeInput = React.useRef(null);
  const navigate = useNavigate();

  const handleJoinPresentation = async (code) => {
    setJoining(true);
    try {
      const apiRes = await presentationApi.checkPresentationCode(code);
      if (apiRes.status === 200 && apiRes.data?.isExist) {
        return navigate(`${PATH.PRESENTATION.ROOT}/${code}`);
      } else {
        toast.error('Mã tham dự trình chiếu không hợp lệ');
      }
    } catch (error) {
      toast.error('Mã tham dự trình chiếu không hợp lệ');
    }
    setJoining(false);
  };

  const handleCheckCode = () => {
    const code = codeInput.current?.value.trim() || '';

    if (!code) return;

    if (code.length > MAX.PRESENTATION_CODE) {
      return toast.error('Mã tham dự trình chiếu không hợp lệ');
    }

    handleJoinPresentation(code);
  };

  return (
    <Flex direction="column" spacing={1} center>
      <Typography fs={14} color="text.secondary">
        Mã tham dự được tìm thấy trên màn hình trước mặt bạn
      </Typography>
      <Flex center spacing={2} wrap wrapSpace="both" {...flexProps}>
        <Input placeholder="Nhập mã tham dự" size="large" ref={codeInput} />
        <Button
          sx={{ flexShrink: 0 }}
          size="large"
          variant="soft"
          color="secondary"
          onClick={handleCheckCode}
          loading={joining}
        >
          Tham gia
        </Button>
      </Flex>
    </Flex>
  );
}

export default JoinPresentation;
