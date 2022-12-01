import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  List,
  makeStyles,
  Popover,
  Typography
} from '@cads-ui/core';
import { Icon } from '@iconify/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import groupApi from '~/apis/groupApi';
import ComponentLoading from '~/components/ComponentLoading';
import ConfirmDialog from '~/components/ConfirmDialog';
import InviteGroup from '~/components/InviteGroup';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import useFetch from '~/hooks/useFetch';

// -----------------------------
const useStyles = makeStyles((_) => ({
  moreIcon: {
    cursor: 'pointer',
    color: 'grey.500',
    w: 24,
    h: 24,
    '&:hover': {
      color: 'grey.700'
    }
  }
}));

// -----------------------------
function Title({ title, numOfMembers = 0 }) {
  return (
    <Box sx={{ my: 6 }}>
      <Flex justifyContent="space-between">
        <Typography
          variant="h3"
          color="secondary.main"
          fs={20}
          fw={400}
          md={{ fs: 28 }}
        >
          {title}
        </Typography>
        {numOfMembers > 0 && (
          <Typography color="secondary.main">
            {numOfMembers} thành viên
          </Typography>
        )}
      </Flex>
      <Divider
        sx={{
          borderColor: 'secondary.main',
          pt: 2,
          _before: { borderColor: 'secondary.main' },
          _after: { borderColor: 'secondary.main' }
        }}
      />
    </Box>
  );
}

function MemberItem({ member, data = {}, mutate }) {
  const classes = useStyles();
  const [confirmState, setConfirmState] = React.useState({
    onConfirmAction: () => {},
    handleClose: () => {},
    titleText: '',
    contentText: '',
    isOpen: false
  });
  const { groupId } = useParams();
  const user = useSelector((state) => state.user);
  const [moreMenuAnchor, setMoreMenuAnchor] = React.useState(null);

  if (!member) return null;
  const { owner = {}, coOwners = [] } = data;

  const onConfirmTransferOwner = async () => {
    try {
      if (owner.username === user.username) {
        const res = await groupApi.postTransferOwner(groupId, {
          oldOwnerId: owner._id,
          newOwnerId: member._id
        });
        if (res.status === 200) {
          toast.success('Chuyển trưởng nhóm thành công');
          setConfirmState({ ...confirmState, isOpen: false });
          mutate();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onConfirmAddMoreCoOwner = async () => {
    try {
      if (owner.username === user.username) {
        const res = await groupApi.postAddMoreCoOwner(groupId, {
          coOwnerId: member._id
        });
        if (res.status === 200) {
          toast.success('Thêm Co-Owner thành công');
          mutate();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onConfirmRemoveCoOwner = async () => {
    try {
      if (owner.username === user.username) {
        const res = await groupApi.postRemoveCoOwner(groupId, {
          coOwnerId: member._id
        });
        if (res.status === 200) {
          toast.success('Xóa Co-Owner thành công');
          mutate();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onConfirmKickOutMember = async () => {
    try {
      const res = await groupApi.postKickOutMember(groupId, {
        memberId: member._id
      });
      if (res.status === 200) {
        toast.success('Xóa Member thành công');
        setConfirmState({ ...confirmState, isOpen: false });
        mutate();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleCloseDialog = () => {
    setConfirmState({ ...confirmState, isOpen: false });
  };

  const handleTransferOwner = () => {
    setMoreMenuAnchor(null);
    setConfirmState({
      onConfirmAction: () => onConfirmTransferOwner,
      handleClose: () => handleCloseDialog,
      titleText: 'Xác nhận chuyển trưởng nhóm',
      contentText: 'Bạn có thực sự muốn chuyển trưởng nhóm cho thành viên này?',
      isOpen: true
    });
  };

  const handleAddCoOwner = () => {
    setMoreMenuAnchor(null);
    onConfirmAddMoreCoOwner();
  };

  const handleRemoveCoOwner = () => {
    setMoreMenuAnchor(null);
    onConfirmRemoveCoOwner();
  };

  const handleKickOutMember = () => {
    setMoreMenuAnchor(null);
    setConfirmState({
      onConfirmAction: () => onConfirmKickOutMember,
      handleClose: () => handleCloseDialog,
      titleText: 'Xác nhận xóa thành viên',
      contentText: 'Bạn thực sự muốn xóa người này ra khỏi nhóm?',
      isOpen: true
    });
  };

  // Check privilege
  const isOwner = owner.username === member.username;
  const isCoOwner =
    coOwners.findIndex((co) => co.username === member.username) !== -1;
  const isMe = user.username === member.username;

  const isUserOwner = owner.username === user.username;
  const isUserCoOwner =
    coOwners.findIndex((co) => co.username === user.username) !== -1;

  const isShowMore = !isMe && (isUserOwner || isUserCoOwner);
  // Prepare more menu
  const moreMenu = [];
  if (isShowMore) {
    if (!isOwner && isUserOwner)
      moreMenu.push({
        primary: 'Chuyển thành chủ sở hữu nhóm',
        icon: <Icon icon="material-symbols:admin-panel-settings" />,
        onItemClick: handleTransferOwner
      });
    if (isUserOwner)
      moreMenu.push(
        isCoOwner
          ? {
              primary: 'Rút quyền đồng sở hữu nhóm',
              icon: <Icon icon="subway:admin-2" />,
              onItemClick: handleRemoveCoOwner
            }
          : {
              primary: 'Chuyển thành đồng sở hữu nhóm',
              icon: <Icon icon="subway:admin-1" />,
              onItemClick: handleAddCoOwner
            }
      );
    if ((isCoOwner && isUserOwner) || (!isOwner && !isCoOwner)) {
      moreMenu.push({
        primary: 'Xoá khỏi nhóm',
        icon: <Icon icon="material-symbols:delete-forever-rounded" />,
        onItemClick: handleKickOutMember
      });
    }
  }

  return (
    <Box>
      <Flex spacing={2} justifyContent="space-between">
        <Flex spacing={3}>
          <Avatar alt={member.name} src={member.avt} />
          <Typography>{`${member.name}${isOwner ? ' - Owner' : ''}${
            isCoOwner ? ' - Co-owner' : ''
          }${isMe ? ' (Tôi)' : ''}`}</Typography>
        </Flex>

        {/* More menu */}
        {isShowMore && !isOwner && moreMenu.length > 0 && (
          <>
            <Icon
              className={classes.moreIcon}
              icon="material-symbols:more-vert"
              onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
            />
            <Popover
              anchorEl={moreMenuAnchor}
              open={Boolean(moreMenuAnchor)}
              onClose={() => setMoreMenuAnchor(null)}
              anchorOrigin={{ horizontal: 'right' }}
              transformOrigin={{ horizontal: 'right' }}
            >
              <List items={moreMenu} />
            </Popover>
          </>
        )}
      </Flex>
      <ConfirmDialog
        onConfirm={confirmState.onConfirmAction}
        titleText={confirmState.titleText}
        contentText={confirmState.contentText}
        isOpen={confirmState.isOpen}
        handleClose={confirmState.handleClose}
      />
      <Divider spacing={3} />
    </Box>
  );
}

// -----------------------------
function GroupMembersPage() {
  const { groupId } = useParams();
  const { data, error, isValidating, mutate } = useFetch(
    `${ENDPOINTS.GROUP}/${groupId}/members`
  );
  const user = useSelector((state) => state.user);

  if (isValidating) return <ComponentLoading />;

  if (error || !data) return <Navigate to={PATH.NOTFOUND} />;

  const { owner = {}, coOwners = [], members = [] } = data;
  const isOwner = owner.username === user.username;
  const isCoOwner =
    coOwners.findIndex((co) => co.username === user.username) !== -1;

  return (
    <Container maxWidth="md">
      <Title title="Mời vào nhóm" />
      {(isOwner || isCoOwner) && (
        <InviteGroup groupCode={data.code} groupId={groupId} />
      )}

      {/* Owner, co-owners */}
      <Box sx={{ my: 10 }}>
        <Title title="Chủ sở hữu" numOfMembers={coOwners.length + 1} />
        <Flex spacing={3} direction="column">
          <MemberItem member={owner} data={data} mutate={mutate} />
          {coOwners.length > 0 &&
            coOwners.map((user) => {
              return (
                <MemberItem
                  member={user}
                  key={user.accountId}
                  data={data}
                  mutate={mutate}
                />
              );
            })}
        </Flex>
      </Box>

      {/* Members */}
      <Title title="Thành viên" numOfMembers={members.length} />
      <Flex spacing={3} direction="column">
        {members.length > 0 ? (
          members.map((user) => {
            return (
              <MemberItem
                member={user}
                key={user.accountId}
                data={data}
                mutate={mutate}
              />
            );
          })
        ) : (
          <Typography color="grey.600" fs={18} align="center" sx={{ mt: 4 }}>
            Chưa có thành viên nào
          </Typography>
        )}
      </Flex>
    </Container>
  );
}

export default GroupMembersPage;
