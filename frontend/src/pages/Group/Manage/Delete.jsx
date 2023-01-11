import { Button, Flex, makeStyles, Typography } from '@cads-ui/core';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import groupApi from '~/apis/groupApi';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import useFetch from '~/hooks/useFetch';

const useStyles = makeStyles((_) => ({
  delWrap: {
    p: 4,
    w: '65%',
    margin: 'auto auto',
    flexGrow: 1,
    flexDirection: 'column',
    maxH: 1,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '8px',
    shadow: 4,
    minH: 150,
    h: 1
  }
}));

function DeleteGroupPage() {
  const [deleting, setDeleting] = React.useState(false);
  const classes = useStyles({});
  const { groupId } = useParams();
  const { data: groupList = [], mutate: refetch } = useFetch(
    `${ENDPOINTS.GROUP}/my-groups`
  );
  const navigate = useNavigate();

  const handleNavigateList = () => {
    navigate(`${PATH.GROUP.LIST}`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (!groupId) throw new Error();
      const apiRes = await groupApi.deleteGroup(groupId);
      if (apiRes.status === 200) {
        toast.success('Xoá nhóm thành công');
        refetch();
        handleNavigateList();
      }
    } catch (error) {
      toast.error('Xoá bản nhóm thất bại, thử lại !');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Flex className={classes.delWrap}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Bạn có chắc muốn xoá nhóm này không
      </Typography>
      <Flex spacing={2}>
        <Button color="grey" onClick={handleNavigateList}>
          Về danh sách nhóm
        </Button>
        <Button color="error" onClick={handleDelete} loading={deleting}>
          Xoá
        </Button>
      </Flex>
    </Flex>
  );
}

export default DeleteGroupPage;
