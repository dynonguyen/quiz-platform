const GroupModel = require('~/models/group.model');

exports.getGroupByID = async (groupID) => {
  try {
    return await GroupModel.findById(groupID);
  } catch (error) {
    throw error;
  }
};
