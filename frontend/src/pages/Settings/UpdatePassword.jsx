import { Alert, Flex, InputPassword } from '@cads-ui/core';
import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import accountApi from '~/apis/accountApi';
import { LS_KEY } from '~/constant/key';
import { MAX, MIN, REGEX } from '~/constant/validation';
import { updateUserInfo } from '~/redux/slices/userSlice';

function PasswordForm(props) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      component="form"
      onSubmit={props.onSubmit}
    >
      <Grid item>{props.title}</Grid>
      <Grid item>
        <InputPassword
          autoFocus
          type="password"
          fullWidth
          defaultValue=""
          error={Boolean(props.error)}
          {...props.register(props.registerName, {
            required: 'Mật khẩu không được bỏ trống',
            maxLength: { value: MAX.PASSWORD, message: 'Mật khẩu quá dài' },
            minLength: { value: MIN.PASSWORD, message: 'Mật khẩu quá ngắn' },
            pattern: { value: REGEX.PASSWORD, message: 'Mật khẩu không hợp lệ' }
          })}
        />
        <Typography variant="caption" sx={{ width: 0.4 }}>
          Mật khẩu từ {MIN.PASSWORD} đến {MAX.PASSWORD} ký tự,
          <br />
          chứa ít nhất một ký tự in thường, một ký tự in hoa, một ký tự số
        </Typography>
      </Grid>
      <Grid item>
        <Button type="submit" variant="outlined">
          {props.buttonValue}
        </Button>
      </Grid>
    </Grid>
  );
}

function UpdatePasswordPage() {
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isPasswordExist, setIsPasswordExist] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY.ACCESS_TOKEN);
    dispatch(updateUserInfo({ isAuth: false }));
  };

  useEffect(() => {
    (async () => {
      try {
        const PasswordExist = await accountApi.checkPasswordExists();
        setIsPasswordExist(PasswordExist.data.message);
        if (!PasswordExist.data.message)
          toast.warning('Bạn chưa có mật khẩu, hãy đặt mật khẩu mới');
      } catch (error) {
        return false;
      }
    })();
  }, []);

  const onSubmitOldPassword = async () => {
    try {
      const res = await accountApi.checkPassword({
        oldPassword: getValues('oldPassword')
      });
      if (res.status === 200) {
        setIsMatchPassword(true);
        toast.success('Nhập mật khẩu mới');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const onSubmitNewPassword = async () => {
    try {
      const res = await accountApi.postUpdatePassword({
        newPassword: getValues('newPassword')
      });
      if (res.status === 200) {
        setIsMatchPassword(false);
        handleLogout();
        toast.success(res.data?.message);
        toast.warning('Vui lòng đăng nhập lại');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <Flex center sx={{ h: 1 }} spacing={2} direction="column">
      {!isMatchPassword && isPasswordExist ? (
        <PasswordForm
          onSubmit={handleSubmit(onSubmitOldPassword)}
          title="Nhập mật khẩu hiện tại của bạn để tiếp tục"
          registerName="oldPassword"
          buttonValue="Kiểm tra"
          register={register}
          error={errors.oldPassword}
        />
      ) : (
        <PasswordForm
          onSubmit={handleSubmit(onSubmitNewPassword)}
          title="Nhập mật khẩu mới"
          registerName="newPassword"
          buttonValue="Đổi mật khẩu"
          register={register}
          error={errors.newPassword}
        />
      )}
      {Object.keys(errors).length > 0 && (
        <Alert variant="standard" type="error">
          {errors[Object.keys(errors)[0]].message}
        </Alert>
      )}
    </Flex>
  );
}

export default UpdatePasswordPage;
