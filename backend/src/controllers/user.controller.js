const { getUserByAccountId } = require('~/services/user.service');

exports.getUserInfo = async (req, res) => {
  try {
    const { accountId, email, verified } = req.user;
    const user = await getUserByAccountId(accountId);
    return res
      .status(200)
      .json({ ...user.toObject(), accountId, email, verified });
  } catch (error) {
    console.log('getUserInfo ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
