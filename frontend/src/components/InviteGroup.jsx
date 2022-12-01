import { Box, Button, Flex, Input, Typography } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import React from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import groupApi from '~/apis/groupApi';
import { generateGroupInviteLink } from '~/helper';

const emailSchema = yup.string().trim().required().email();

function InviteGroup({ groupCode, groupId }) {
  const [copied, setCopied] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const emailRef = React.useRef(null);

  const handleCopyLink = () => {
    if (!copied) {
      const inviteLink = generateGroupInviteLink(groupCode);
      navigator?.clipboard.writeText(inviteLink);
      setCopied(true);
    }
  };

  const handleSendMail = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    const isValid = emailSchema.isValidSync(email);
    if (!isValid) {
      return toast.error('Email không hợp lệ !');
    }

    try {
      setSending(true);
      const apiRes = await groupApi.postInviteJoinGroup(email, groupId);
      if (apiRes.status === 200) {
        toast.success('Gửi thư mời thành công');
        if (emailRef.current) {
          emailRef.current.value = '';
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || 'Gửi thư mời không thành công, thử lại'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Flex direction="column" spacing={2}>
      <Flex spacing={4} wrap wrapSpace="both">
        <Flex spacing={1} direction="column">
          <Typography color="grey.600" component="label" htmlFor="email">
            Email
          </Typography>
          <Input placeholder="example@gmail.com" id="email" ref={emailRef} />
        </Flex>
        <Box sx={{ alignSelf: 'flex-end' }} onClick={handleSendMail}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            loading={sending}
          >
            Mời
          </Button>
        </Box>
      </Flex>

      {/* Copy link */}
      <Flex
        spacing={1}
        sx={{ cursor: 'pointer', _hover: { filter: 'brightness(0.7)' } }}
        onClick={handleCopyLink}
        component="span"
      >
        {copied ? (
          <>
            <Icon
              style={{ color: 'var(--cads-palette-success-main)' }}
              icon="material-symbols:check-circle-rounded"
            />
            <Typography fs={14} color="success.main">
              Đã sao chép liên kết mời
            </Typography>
          </>
        ) : (
          <>
            <Icon
              style={{ color: 'var(--cads-palette-secondary-dark)' }}
              icon="material-symbols:content-copy"
            />
            <Typography fs={14} color="secondary.dark">
              Sao chép liên kết mời
            </Typography>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default InviteGroup;
