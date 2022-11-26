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
import ComponentLoading from '~/components/ComponentLoading';
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
    <Box sx={{ my: 8 }}>
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
          _before: { borderColor: 'secondary.main' },
          _after: { borderColor: 'secondary.main' }
        }}
      />
    </Box>
  );
}

function MemberItem({ member, data = {} }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [moreMenuAnchor, setMoreMenuAnchor] = React.useState(null);

  if (!member) return null;

  const { owner = {}, coOwners = [] } = data;

  //  Handler
  const handleTransferOwner = () => {};

  const handleAddCoOwner = () => {};

  const handleRemoveCoOwner = () => {};

  const handleKickOutMember = () => {};

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
    if (!isOwner)
      moreMenu.push({
        primary: 'Chuyển thành chủ sở hữu nhóm',
        icon: <Icon icon="material-symbols:admin-panel-settings" />,
        onItemClick: handleTransferOwner
      });
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
    moreMenu.push({
      primary: 'Xoá khỏi nhóm',
      icon: <Icon icon="material-symbols:delete-forever-rounded" />,
      onItemClick: handleKickOutMember
    });
  }

  return (
    <Flex spacing={2} justifyContent="space-between">
      <Flex spacing={3}>
        <Avatar alt={member.name} src={member.avt} />
        <Typography>{`${member.name}${isOwner ? ' - Owner' : ''}${
          isCoOwner ? ' - Co-owner' : ''
        }${isMe ? ' (Tôi)' : ''}`}</Typography>
      </Flex>

      {/* More menu */}
      {isShowMore && (
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
  );
}

// -----------------------------
function GroupMembersPage() {
  const { groupId } = useParams();
  const { data, error, isValidating } = useFetch(
    `${ENDPOINTS.GROUP}/${groupId}/members`
  );

  if (isValidating) return <ComponentLoading />;

  if (error || !data) return <Navigate to={PATH.NOTFOUND} />;

  const { owner = {}, coOwners = [], members = [] } = data;

  return (
    <Container maxWidth="md">
      {/* Owner, co-owners */}
      <Title title="Chủ sở hữu" numOfMembers={coOwners.length + 1} />
      <Flex spacing={6} direction="column">
        <MemberItem member={owner} data={data} />
        {coOwners.length > 0 &&
          coOwners.map((user) => {
            return (
              <MemberItem member={user} key={user.accountId} data={data} />
            );
          })}
      </Flex>

      {/* Members */}
      <Title title="Thành viên" numOfMembers={members.length} />
      <Flex spacing={4} direction="column">
        {members.length > 0 ? (
          members.map((user) => {
            return (
              <MemberItem member={user} key={user.accountId} data={data} />
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
