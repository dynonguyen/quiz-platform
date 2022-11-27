import { Button, Flex, Input, Typography } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import groupApi from '~/apis/groupApi';
import { useLeftMenuStyles } from '~/common/styles';
import { PATH } from '~/constant/path';
import { MAX } from '~/constant/validation';

const schema = yup.object({
  name: yup
    .string()
    .required('Tên lớp là bắt buộc')
    .max(MAX.GROUP_NAME, `Tên lớp không được quá ${MAX.GROUP_NAME} ký tự`),
  desc: yup
    .string()
    .required('Mô tả là bắt buộc')
    .max(MAX.GROUP_DESC, `Mô tả không được quá ${MAX.GROUP_DESC} ký tự`)
});

function NewGroupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const classes = useLeftMenuStyles();

  const handleCreateGroup = async (form) => {
    try {
      const apiRes = await groupApi.postCreateGroup(form);

      if (apiRes.status === 201) {
        toast.success('Tạo nhóm thành công');
        navigate(`${PATH.MANAGE_GROUP.ROOT}/${apiRes.data._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Tạo nhóm thất bại');
    }
  };

  return (
    <Flex
      onSubmit={handleSubmit(handleCreateGroup)}
      component="form"
      direction="column"
      spacing={4}
      center
      className={clsx(classes.box, 'content')}
    >
      <Typography variant="h3">Tạo nhóm mới</Typography>
      <Flex direction="column" spacing={1}>
        <Input
          error={Boolean(errors.name)}
          placeholder="Nhập tên nhóm"
          size="small"
          {...register('name')}
        />
        {errors.name && (
          <Typography color="error.main" fs={12}>
            {errors.name.message}
          </Typography>
        )}
      </Flex>

      <Flex direction="column" spacing={1}>
        <Input
          error={Boolean(errors.desc)}
          placeholder="Nhập mô tả"
          size="small"
          {...register('desc')}
        />
        {errors.name && (
          <Typography color="error.main" fs={12}>
            {errors.name.message}
          </Typography>
        )}
      </Flex>

      <Button type="submit">Tạo nhóm</Button>
    </Flex>
  );
}

export default NewGroupPage;
