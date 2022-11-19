const UserModel = require('~/models/user.model');

exports.getUserByAccountId = async (accountId) => {
  try {
    return await UserModel.findOne({ accountId });
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (accountId, username, name, avt = '') => {
  try {
    const newUser = await UserModel.create({ accountId, name, username, avt });
    if (newUser && newUser._id) return newUser;
    return null;
  } catch (error) {
    throw error;
  }
};
