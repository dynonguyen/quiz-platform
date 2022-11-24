const GroupModel = require('~/models/group.model');

exports.getGroupByID = async (groupID) => {
  try {
    return await UserModel.findById({ groupID });
  } catch (error) {
    throw error;
  }
};
