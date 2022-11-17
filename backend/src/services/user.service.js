const UserModel = require('~/models/user.model');

exports.getUserByAccountId = async (accountId) => {
  try {
    return await UserModel.findOne({ accountId });
  } catch (error) {
    throw error;
  }
};
