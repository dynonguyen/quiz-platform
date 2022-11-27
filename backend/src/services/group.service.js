const GroupModel = require('~/models/group.model');

exports.getGroupById = async (
  groupId,
  withoutPopulate = false,
  populateOptions = { owner: {}, coOwners: {}, members: {} },
) => {
  try {
    if (withoutPopulate) {
      return await GroupModel.findById(groupId);
    }

    return await GroupModel.findById(groupId)
      .populate({
        path: 'owner',
        ...(populateOptions?.owner || {}),
      })
      .populate({
        path: 'coOwners',
        ...(populateOptions?.coOwners || {}),
      })
      .populate({
        path: 'members',
        ...(populateOptions?.members || {}),
      });
  } catch (error) {
    throw error;
  }
};

exports.getGroupByCode = async (code) => {
  return await GroupModel.findOne({ code });
};

exports.checkUserExistInGroup = async (userId, query = {}) => {
  return await GroupModel.exists({
    ...query,
    $or: [{ owner: userId }, { coOwners: userId }, { members: userId }],
  });
};

exports.joinGroup = async (userId, query = {}) => {
  return await GroupModel.updateOne(query, { $push: { members: userId } });
};

exports.createGroup = async (group = {}) => {
  return await GroupModel.create(group);
};

exports.getGroupsByOwnerId = async (ownerId) => {
  return await GroupModel.find({ owner: ownerId }).populate('owner');
};
