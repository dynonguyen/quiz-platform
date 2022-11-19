import { Button, Flex, makeStyles, Typography } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import accountApi from '~/apis/accountApi';
import ComponentLoading from '~/components/ComponentLoading';
import { LS_KEY } from '~/constant/key';
import { updateUserInfo } from '~/redux/slices/userSlice';

// -----------------------------
const useStyles = makeStyles((_) => ({
  icon: {
    w: '40px',
    h: '40px',
    color: 'success.main'
  }
}));

// -----------------------------
function ActivationPage() {
  const { verified, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [activating, setActivating] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const classes = useStyles();

  React.useEffect(() => {
    if (code && !verified) {
      (async function () {
        try {
          const apiRes = await accountApi.postActivateAccount(code);
          if (apiRes.status === 200) {
            toast.success('Kích hoạt tài khoản thành công !');
            if (apiRes.data.token) {
              localStorage.setItem(LS_KEY.ACCESS_TOKEN, apiRes.data.token);
              dispatch(updateUserInfo({ verified: true }));
              setSearchParams('');
            }
          }
        } catch (error) {
          toast.error('Kích hoạt tài khoản thất bại !');
        }
        setActivating(false);
      })();
    }
  }, []);

  if (code && !verified && activating) {
    return (
      <ComponentLoading text="Đang xác minh ..." flexProps={{ sx: { h: 1 } }} />
    );
  }

  const handleSendMail = async () => {
    try {
      setSending(true);
      const apiRes = await accountApi.postSendActivateAccount();
      if (apiRes.status === 200) {
        setSent(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Gửi mail thất bại, vui lòng thử lại.'
      );
    }
    setSending(false);
  };

  return (
    <Flex spacing={4} direction="column" center sx={{ h: 1 }}>
      {verified ? (
        <>
          <Icon className={classes.icon} icon="mdi:check-decagram" />
          <Typography color="text.secondary" align="center">
            Tài khoản của bạn đã được xác minh.
          </Typography>
        </>
      ) : sent ? (
        <>
          <Icon icon="mdi:email-fast" className={classes.icon} />
          <Typography color="text.secondary" align="center">
            Chúng tôi đã gửi một thư xác minh đến địa chỉ mail <b>{email}</b>,
            vui lòng kiểm tra email. Xin cảm ơn.
          </Typography>
        </>
      ) : (
        <>
          <Typography color="text.secondary" align="center">
            Tài khoản của bạn chưa được xác minh, vui lòng nhấn nút bên dưới để
            kích hoạt tài khoản !
          </Typography>
          <Button
            size="large"
            variant="outlined"
            onClick={handleSendMail}
            loading={sending}
          >
            Gửi mail xác minh
          </Button>
        </>
      )}
    </Flex>
  );
}

export default ActivationPage;
