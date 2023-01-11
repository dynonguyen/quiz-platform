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

exports.getGroupsByMemberId = async (userId) => {
  return await GroupModel.find({
    $or: [{ coOwners: userId }, { members: userId }],
  }).populate('owner');
};

exports.transferOwner = async (groupId, OldOwnerId, newOwnerId) => {
  try {
    await GroupModel.findByIdAndUpdate(
      { _id: groupId },
      {
        $pullAll: { coOwners: [newOwnerId], members: [newOwnerId] },
        $set: { owner: newOwnerId },
      },
    );
    return await GroupModel.findByIdAndUpdate(
      { _id: groupId },
      { $push: { coOwners: OldOwnerId } },
    );
  } catch (error) {
    throw error;
  }
};

exports.addMoreCoOwner = async (groupId, coOwnerId) => {
  try {
    return await GroupModel.findByIdAndUpdate(
      { _id: groupId },
      {
        $pullAll: { members: [coOwnerId] },
        $push: { coOwners: coOwnerId },
      },
    );
  } catch (error) {
    throw error;
  }
};

exports.removeCoOwner = async (groupId, coOwnerId) => {
  try {
    return await GroupModel.findByIdAndUpdate(
      { _id: groupId },
      {
        $pullAll: { coOwners: [coOwnerId] },
        $push: { members: coOwnerId },
      },
    );
  } catch (error) {
    throw error;
  }
};

exports.kickOutMember = async (groupId, memberId) => {
  try {
    return await GroupModel.findByIdAndUpdate(
      { _id: groupId },
      {
        $pullAll: { coOwners: [memberId], members: [memberId] },
      },
    );
  } catch (error) {
    throw error;
  }
};

exports.deleteGroupById = async (_id) => {
  return await GroupModel.deleteOne({ _id });
};
