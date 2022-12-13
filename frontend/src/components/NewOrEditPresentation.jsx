import { Alert, Button, Dialog, Flex, Input, useId } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import presentationApi from '~/apis/presentationApi';
import { MAX } from '~/constant/validation';

// -----------------------------
const schema = yup.object({
  name: yup
    .string()
    .required('Vui lòng nhập tên')
    .max(MAX.PRESENTATION_NAME, `Tên tối đa ${MAX.PRESENTATION_NAME} ký tự`),
  desc: yup
    .string()
    .max(MAX.PRESENTATION_DESC, `Mô tối đa ${MAX.PRESENTATION_DESC} ký tự`)
});

// -----------------------------
function NewOrEditPresentation({
  onClose = () => {},
  // If passed, this form will be the edit form
  presentInfo,
  onRefetch = () => {}
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const formId = useId({ deps: [] });
  const { _id: presentId, name = '', desc = '' } = presentInfo || {};
  const [loading, setLoading] = React.useState(false);
  const isEdit = Boolean(presentId);

  const handleCreate = async (form) => {
    setLoading(true);
    try {
      const apiRes = await presentationApi.postCreateNewTicket(form);
      if (apiRes.status === 201) {
        toast.success('Tạo bản trình chiếu thành công');
        onClose();
        onRefetch();
      }
    } catch (error) {
      return toast.error('Tạo bản trình chiếu thất bại, thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (form) => {
    // DONE: edit presentation
    setLoading(true);
    try {
      const apiRes = await presentationApi.putUpdatePresentation(
        { _id: presentId },
        form
      );
      if (apiRes.status === 200) {
        toast.success('Chỉnh sửa bản trình chiếu thành công');
        onClose();
        onRefetch();
      }
    } catch (error) {
      return toast.error('Chỉnh bản trình chiếu thất bại, thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={true}
      header="Tạo bản trình chiếu mới"
      disabledBackdropClick
      body={
        <Flex
          direction="column"
          spacing={4}
          component="form"
          onSubmit={handleSubmit(isEdit ? handleEdit : handleCreate)}
          id={formId}
        >
          {Object.keys(errors).length > 0 && (
            <Alert variant="standard" type="error">
              {errors[Object.keys(errors)[0]].message}
            </Alert>
          )}
          <Input
            placeholder="Nhập tên bản trình bày (*)"
            autoFocus
            error={Boolean(errors.name)}
            defaultValue={name}
            {...register('name')}
          />
          <Input
            placeholder="Nhập mô tả (nếu có)"
            defaultValue={desc}
            {...register('desc')}
            error={Boolean(errors.desc)}
          />
        </Flex>
      }
      action={
        <Flex spacing={2} justifyContent="flex-end">
          <Button color="grey" onClick={onClose}>
            Huỷ bỏ
          </Button>
          {!isEdit && (
            <Button type="submit" form={formId} loading={loading}>
              Tạo mới
            </Button>
          )}
          {isEdit && (
            <Button type="submit" form={formId} loading={loading}>
              Chỉnh sửa
            </Button>
          )}
        </Flex>
      }
      onClose={onClose}
      hideDivider
    />
  );
}

export default NewOrEditPresentation;
