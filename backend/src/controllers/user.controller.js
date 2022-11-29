const {
  getUserByAccountId,
  updateUser,
  isUsernameExist,
} = require('~/services/user.service');

exports.getUserInfo = async (req, res) => {
  try {
    const { accountId, email, verified } = req.user;
    const user = await getUserByAccountId(accountId);
    return res
      .status(200)
      .json({ ...user.toObject(), accountId, email, verified });
  } catch (error) {
    console.log('getUserInfo ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const user = await getUserByAccountId(accountId);
    return res.status(200).json(user.toJSON());
  } catch (error) {
    console.log('getUserInfo ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.postUpdateUser = async (req, res) => {
  try {
    const { updateField, updateContent } = req.body;
    const { userId } = req.user;
    let isValid = true;
    if (updateField === 'username') {
      const isExist = await isUsernameExist(updateContent);
      if (isExist) {
        isValid = false;
        return res.status(400).json({ message: 'Username đã tồn tại' });
      }
    }
    if (isValid) {
      updateUser(userId, updateField, updateContent);
      return res.status(200).json({ message: 'Success' });
    }
  } catch (error) {
    console.log('updateUser ERROR: ', error);
    return res.status(400).json({ message: error });
  }
};
