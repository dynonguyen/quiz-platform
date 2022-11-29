import { Alert, makeStyles } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Badge,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import userApi from '~/apis/userApi';
import { MAX } from '~/constant/validation';

const usernameRegExp = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
// const avatarRegExp =
// /^((ftp|http|https):\/\/)(www.)[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
const usernameSchema = yup.object({
  username: yup
    .string()
    .required()
    .matches(usernameRegExp, 'Username không hợp lệ')
});
const nameSchema = yup.object({
  name: yup.string().required().max(MAX.NAME)
});

const avtSchema = yup.object({
  name: yup.string().url()
});

const useStyles = makeStyles((_) => ({
  badgeIcon: {
    cursor: 'pointer',
    backgroundColor: 'white',
    w: 24,
    h: 24,
    p: 1,
    borderRadius: '50%',
    border: '1px solid black',
    '&:hover': {
      color: 'grey.700'
    }
  }
}));

const testImage = (url, timeout) =>
  new Promise((res) => {
    timeout = timeout || 5000;
    let timedOut = false;
    let timer;
    const img = new Image();

    img.onerror = img.onabort = function () {
      if (!timedOut) {
        clearTimeout(timer);
        res('error');
      }
    };

    img.onload = function () {
      if (!timedOut) {
        clearTimeout(timer);
        res('success');
      }
    };

    img.src = url;

    timer = setTimeout(function () {
      timedOut = true;
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = '//!!!!/test.jpg';
      res('timeout');
    }, timeout);
  });

function FormDialog({
  isOpen,
  onCancel,
  title,
  content,
  defaultValue,
  fieldName
}) {
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      fieldName === 'name'
        ? nameSchema
        : fieldName === 'avt'
        ? avtSchema
        : usernameSchema
    )
  });
  const onSubmit = async () => {
    try {
      const res = await userApi.postUpdateUser({
        updateField: fieldName,
        updateContent: getValues(fieldName)
      });
      if (res.status === 200) {
        toast.success('Cập nhật thông tin thành công');
        onCancel();
      }
    } catch (error) {
      toast.error(
        `Có lỗi xảy ra, vui lòng kiểm tra lại: ${error.response.data.message}`
      );
    }
  };
  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{`Chỉnh sửa ${title}`}</DialogTitle>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={title}
            type="text"
            fullWidth
            variant="standard"
            defaultValue={defaultValue}
            error={Boolean(errors[fieldName])}
            {...register(fieldName)}
          />
          {Object.keys(errors).length > 0 && (
            <Alert variant="standard" type="error">
              {errors[Object.keys(errors)[0]].message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </FormControl>
    </Dialog>
  );
}

function UserInfo({ title, content }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={true}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          {title === 'Email' ? (
            content
          ) : (
            <Link href="#" underline="none" onClick={handleClickOpen}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={5}
                onClick={handleClickOpen}
              >
                <Grid item>{content}</Grid>
                <Grid item>
                  <Icon icon="material-symbols:edit" />
                </Grid>
              </Grid>
            </Link>
          )}
        </Grid>
      </Grid>
      <FormDialog
        isOpen={open}
        onCancel={handleClose}
        title={title}
        content={`${title} mới của bạn là`}
        defaultValue={content}
        fieldName={title === 'Tài khoản' ? 'username' : 'name'}
      />
    </Grid>
  );
}

function ProfilePage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { username, name, email, avt } = useSelector((state) => state.user);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={5}
      >
        <Grid item>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Icon
                icon="material-symbols:edit"
                className={classes.badgeIcon}
                onClick={handleClickOpen}
              />
            }
          >
            <Avatar alt={name} src={avt} sx={{ width: 96, height: 96 }} />
          </Badge>
        </Grid>
        <Grid item xs={true}>
          <Grid container direction="column" spacing={6}>
            <UserInfo title="Họ tên" content={name} />
            <UserInfo title="Tài khoản" content={username} />
            <UserInfo title="Email" content={email} />
          </Grid>
        </Grid>
      </Grid>
      <FormDialog
        isOpen={open}
        onCancel={handleClose}
        title="Avatar"
        content="Link avatar của bạn"
        defaultValue={avt}
        fieldName="avt"
      />
    </Container>
  );
}

export default ProfilePage;
