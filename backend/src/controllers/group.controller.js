const { getGroupById } = require('~/services/group.service');
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
