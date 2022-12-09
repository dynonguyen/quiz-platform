const { sendEmail, inviteJoinGroupMail } = require('~/configs/mail.config');
const { APP_NAME, MAX, GROUP_ROLES } = require('~/constant');
const { getEnv, generateUniqueString } = require('~/helper');
const {
  getGroupById,
  checkUserExistInGroup,
  getGroupByCode,
  joinGroup,
  createGroup,
  getGroupsByOwnerId,
  getGroupsByMemberId,
  transferOwner,
  addMoreCoOwner,
  removeCoOwner,
  kickOutMember,
} = require('~/services/group.service');
const {
  getUserByAccountId,
  getUserByQuery,
  getUserByEmail,
} = require('~/services/user.service');

const MESSAGE = {
  GROUP_NOT_FOUND: 'Nhóm không tồn tại',
  USER_NOT_FOUND: 'Bạn không thuộc nhóm này',
  NOT_PERMITTED: 'Bạn không có quyền thực hiện hành động này',
};

exports.getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.user;

    if (!userId || !groupId) {
      throw new Error('groupId not found');
    }

    const group = await getGroupById(groupId);
    if (!group) {
      throw new Error('Group not found');
    }

    // Check user in group
    const memberIds = [
      group.owner?._id.toString(),
      ...group.coOwners?.map((co) => co._id.toString()),
      ...group.members?.map((m) => m._id.toString()),
    ];

    if (!memberIds.includes(userId)) {
      throw new Error('User not found in group');
    }

    return res.status(200).json(group.toObject());
  } catch (error) {
    console.log('getMembersList ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.getMyGroups = async (req, res) => {
  try {
    const { userId } = req.user;
    const groups = await getGroupsByOwnerId(userId);
    return res.status(200).json({ groups: groups || [] });
  } catch (error) {
    console.log('getMyGroups ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.getJoinedGroups = async (req, res) => {
  try {
    const { userId } = req.user;
    const groups = await getGroupsByMemberId(userId);
    return res.status(200).json({ groups: groups || [] });
  } catch (error) {
    console.log('getMyGroups ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.getRoleInGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.user;

    const group = await getGroupById(groupId);
    if (!group) {
      throw new Error('Group is not exists');
    }

    if (group.owner._id.toString() === userId) {
      return res.status(200).json({ role: GROUP_ROLES.OWNER });
    }

    if (group.coOwners.findIndex((co) => co._id.toString() === userId) !== -1) {
      return res.status(200).json({ role: GROUP_ROLES.CO_OWNER });
    }

    if (group.members.findIndex((m) => m._id.toString() === userId) !== -1) {
      return res.status(200).json({ role: GROUP_ROLES.MEMBER });
    }

    throw new Error('User is not exists in group');
  } catch (error) {
    console.log('getRoleInGroup ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.postJoinGroupByCode = async (req, res) => {
  try {
    const { code } = req.body;
    const { userId } = req.user;

    if (!code) throw new Error('Code invalid');

    const group = await getGroupByCode(code);
    if (!group) throw new Error('Code invalid');

    const isUserInGroup = await checkUserExistInGroup(userId, { code });

    if (isUserInGroup) {
      return res.status(200).json({ message: 'success', groupId: group._id });
    }

    await joinGroup(userId, { code });

    return res.status(201).json({ message: 'success', groupId: group._id });
  } catch (error) {
    console.log('postJoinGroupByCode ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.postInviteJoinGroup = async (req, res) => {
  try {
    const { email, groupId } = req.body;
    const { accountId } = req.user;

    if (!email) {
      return res.status(400).json({ message: 'Email không được trống' });
    }

    const group = await getGroupById(groupId, true);
    if (!group) {
      throw new Error('Group not exist');
    }
    const user = await getUserByAccountId(accountId);

    const userEmail = await getUserByEmail(email);
    if (userEmail.accountId) {
      const isUserExist = await checkUserExistInGroup(userEmail._id);
      if (isUserExist) {
        return res
          .status(400)
          .json({ message: 'Người dùng đã là thành viên trong nhóm' });
      }
    }

    const clientUrl = `${getEnv('CLIENT_URL')}/group/join?code=${group.code}`;
    await sendEmail({
      subject: `Mời tham gia nhóm trên ${APP_NAME}`,
      to: email,
      html: inviteJoinGroupMail(clientUrl, group.name, user.name),
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log('postInviteJoinGroup ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.postCreateGroup = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const { userId } = req.user;

    let code = generateUniqueString(MAX.GROUP_CODE);
    const limitLoop = 5;
    for (let i = 0; i < limitLoop; i++) {
      const isGroupExist = await getGroupByCode(code);
      if (isGroupExist) {
        code = generateUniqueString(MAX.GROUP_CODE);
      } else {
        break;
      }
    }

    const newGroup = await createGroup({ name, desc, code, owner: userId });
    if (newGroup) {
      return res.status(201).json(newGroup.toObject());
    }
    throw new Error('Create group false');
  } catch (error) {
    console.log('postCreateGroup ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.postTransferOwner = async (req, res) => {
  try {
    const { oldOwnerId, newOwnerId } = req.body;
    const { groupId } = req.params;
    const { userId } = req.user;

    if (!userId || !groupId) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    const group = await getGroupById(groupId);
    if (!group) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    if (group.owner?._id.toString() !== userId || userId !== oldOwnerId) {
      return res.status(400).json({ message: MESSAGE.NOT_PERMITTED });
    }
    const response = transferOwner(groupId, oldOwnerId, newOwnerId);
    if (response) return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log('Transfer error: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.postAddMoreCoOwner = async (req, res) => {
  try {
    const { coOwnerId } = req.body;
    const { groupId } = req.params;
    const { userId } = req.user;

    if (!userId || !groupId) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    const group = await getGroupById(groupId);
    if (!group) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    if (group.owner?._id.toString() !== userId) {
      return res.status(400).json({ message: MESSAGE.NOT_PERMITTED });
    }
    const response = addMoreCoOwner(groupId, coOwnerId);
    if (response) return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log('Transfer error: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.postRemoveCoOwner = async (req, res) => {
  try {
    const { coOwnerId } = req.body;
    const { groupId } = req.params;
    const { userId } = req.user;

    if (!userId || !groupId) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    const group = await getGroupById(groupId);
    if (!group) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    if (group.owner?._id.toString() !== userId) {
      return res.status(400).json({ message: MESSAGE.NOT_PERMITTED });
    }
    const response = removeCoOwner(groupId, coOwnerId);
    if (response) return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log('Transfer error: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.postKickOutMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const { groupId } = req.params;
    const { userId } = req.user;

    if (!userId || !groupId) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    const group = await getGroupById(groupId);
    if (!group) {
      return res.status(400).json({ message: MESSAGE.GROUP_NOT_FOUND });
    }

    const Owner = group.owner?._id.toString();
    const coOwner = [...group.coOwners?.map((co) => co._id.toString())];
    if (
      Owner !== userId &&
      coOwner.includes(userId) &&
      (Owner === memberId || coOwner.includes(memberId))
    ) {
      return res.status(400).json({ message: MESSAGE.NOT_PERMITTED });
    }
    const response = kickOutMember(groupId, memberId);
    if (response) return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log('Transfer error: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};
