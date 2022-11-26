const { sendEmail, inviteJoinGroupMail } = require('~/configs/mail.config');
const { APP_NAME } = require('~/constant');
const { getEnv } = require('~/helper');
const {
  getGroupById,
  checkUserExistInGroup,
  getGroupByCode,
  joinGroup,
} = require('~/services/group.service');
const { getUserByAccountId } = require('~/services/user.service');

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
    const { emails = [], groupId } = req.body;
    const { accountId } = req.user;

    if (!emails || emails.length === 0) {
      throw new Error('Emails is empty');
    }

    const group = await getGroupById(groupId, true);
    if (!group) {
      throw new Error('Group not exist');
    }
    const user = await getUserByAccountId(accountId);

    const clientUrl = `${getEnv('CLIENT_URL')}/group/join?code=${group.code}`;
    emails.forEach((email) => {
      sendEmail({
        subject: `Mời tham gia nhóm trên ${APP_NAME}`,
        to: email,
        html: inviteJoinGroupMail(clientUrl, group.name, user.name),
      });
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log('postInviteJoinGroup ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
