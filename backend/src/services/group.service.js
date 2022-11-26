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
