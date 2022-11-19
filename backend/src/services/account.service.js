const { ACCOUNT_TYPES } = require('~/constant');
const AccountModel = require('~/models/account.model');
const UserModel = require('~/models/user.model');

exports.isExistAccount = async (email) => {
  try {
    return await AccountModel.exists({ email });
  } catch (error) {
    throw error;
  }
};

exports.findAccount = async (email) => {
  try {
    return await AccountModel.findOne({ email });
  } catch (error) {
    throw error;
  }
};

exports.createAccount = async (
  email,
  password,
  authType = ACCOUNT_TYPES.LOCAL,
) => {
  try {
    const newAccount = await AccountModel.create({ email, password, authType });
    if (newAccount && newAccount._id) return newAccount._id;
    return null;
  } catch (error) {
    throw error;
  }
};

exports.isVerified = async (accountId) => {
  if (!accountId) return false;
  try {
    return await AccountModel.exists({ accountId, verified: true });
  } catch (error) {
    throw error;
  }
};

exports.updateAccountById = async (accountId, updateFields = {}) => {
  try {
    return await AccountModel.updateOne({ _id: accountId }, updateFields);
  } catch (error) {
    throw error;
  }
};
