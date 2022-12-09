import {
  Box,
  Button,
  Container,
  Flex,
  List,
  makeStyles,
  Popover,
  Table,
  Typography,
  useOnDOMClickOutside
} from '@cads-ui/core';
import { Icon } from '@iconify/react';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoinPresentation from '~/components/JoinPresentation';
import NewOrEditPresentation from '~/components/NewOrEditPresentation';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import useFetch from '~/hooks/useFetch';

// -----------------------------
const useStyles = makeStyles((_) => ({
  moreIcon: {
    fs: 28,
    transition: 'color 0.2s',
    cursor: 'pointer',
    _hover: {
      color: 'text.secondary'
    }
  },
  delIcon: {
    '& *': {
      color: 'error.main'
    }
  }
}));

// -----------------------------
function PresentationPage() {
  const { isAuth } = useSelector((state) => state.user);
  const { data: presentationList = [], isValidating } = useFetch(
    isAuth ? `${ENDPOINTS.PRESENTATION}/list` : null
  );
  const classes = useStyles();
  const [moreMenuAnchor, setMoreMenuAnchor] = React.useState(null);
  const [openNewEditModal, setOpenNewEditModal] = React.useState(false);
  const presentInfo = React.useRef(null);
  const navigate = useNavigate();

  useOnDOMClickOutside(`.${classes.moreIcon}`, () => {
    setMoreMenuAnchor(null);
  });

  const handlePresent = () => {
    console.log('PRESENT: ', presentInfo.current);
  };

  const handleOpenNewPresentation = () => {
    if (!isAuth) {
      return navigate(PATH.LOGIN);
    }
    setOpenNewEditModal(true);
  };

  const handleCopyCode = () => {
    navigator?.clipboard?.writeText(
      `${window.location.origin}/${PATH.PRESENTATION.ROOT}/${presentInfo.current?.code}`
    );
    toast.success('Đã sao chép liên kết chia sẻ vào clipboard');
  };

  const handleDelete = () => {
    // TODO: Delete presentation
    console.log('DELETE: ', presentInfo.current);
  };

  const columns = [
    {
      key: 'name',
      title: 'Tên'
    },
    { key: 'code', title: 'Mã tham dự' },
    {
      key: 'slides',
      title: 'Số slide',
      render: (slides) => slides?.length || 0
    },
    {
      key: 'createdAt',
      title: 'Ngày tạo',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
      maxWidth: 100
    },
    {
      key: 'updatedAt',
      title: 'Ngày sửa',
      sorter: { multiple: 1, defaultOrder: 'descend' },
      render: (updatedAt) => moment(updatedAt).format('DD/MM/YYYY HH:mm'),
      maxWidth: 100
    },
    {
      key: '__action',
      title: '',
      align: 'right',
      render: (_, record) => (
        <Icon
          onClick={(e) => {
            setMoreMenuAnchor(e.target);
            presentInfo.current = record;
          }}
          className={classes.moreIcon}
          icon="material-symbols:more-horiz"
        />
      )
    }
  ];

  const moreMenu = [
    {
      primary: 'Trình chiếu',
      icon: <Icon icon="material-symbols:play-arrow-rounded" />,
      onItemClick: handlePresent
    },
    {
      primary: 'Chia sẻ',
      icon: <Icon icon="material-symbols:share" />,
      onItemClick: handleCopyCode
    },
    {
      primary: 'Đổi tên - mô tả',
      icon: <Icon icon="material-symbols:edit" />,
      onItemClick: () => setOpenNewEditModal(true)
    },
    {
      primary: 'Xoá',
      icon: <Icon icon="material-symbols:delete-rounded" />,
      itemProps: { className: classes.delIcon },
      onItemClick: handleDelete
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      {/* Join presentation */}
      <Box sx={{ mb: 8 }}>
        <JoinPresentation />
      </Box>

      {/* My presentation */}
      <Table
        header={
          <Flex justifyContent="space-between" wrap wrapSpace="row">
            <Typography variant="h4">Trình chiếu của tôi</Typography>
            <Button
              startIcon={<Icon icon="material-symbols:add" />}
              onClick={handleOpenNewPresentation}
            >
              Tạo trình chiếu mới
            </Button>
          </Flex>
        }
        columns={columns}
        rows={presentationList}
        loading={isValidating}
        keyField="_id"
        allowExport
        searchControl={{ fields: ['name', 'code'] }}
        rowFilterControl={{
          name: 'text',
          createdAt: 'date',
          updatedAt: 'date'
        }}
      />

      {/* More menu */}
      <Popover
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={() => {
          setMoreMenuAnchor(null);
          presentInfo.current = null;
        }}
        disabledBackdropClick
        anchorOrigin={{ horizontal: 'right' }}
        transformOrigin={{ horizontal: 'right' }}
      >
        <List sx={{ py: 2 }} items={moreMenu} />
      </Popover>

      {/* New presentation modal */}
      {isAuth && openNewEditModal && (
        <NewOrEditPresentation
          onClose={() => {
            setOpenNewEditModal(false);
            presentInfo.current = null;
          }}
          presentInfo={presentInfo.current}
        />
      )}
    </Container>
  );
}

export default PresentationPage;
