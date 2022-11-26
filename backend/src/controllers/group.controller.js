const { getGroupByID } = require('~/services/group.service');
const { getUserByAccountId } = require('~/services/user.service');

exports.getGroup = async (req, res) => {
  try {
    const groupID = req.params.groupID;
    const group = await getGroupByID(groupID);
    let newGroup = group;
    newGroup.owner = await getUserByAccountId(group.owner);
    let coOwners = [],
      members = [];
    for (value of group.coOwners) {
      coOwners.push(await getUserByAccountId(value));
    }
    for (value of group.members) {
      members.push(await getUserByAccountId(value));
    }
    newGroup.members = members;
    newGroup.coOwners = coOwners;
    return res.status(200).json(newGroup.toJSON());
  } catch (error) {
    console.log('getMembersList ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
