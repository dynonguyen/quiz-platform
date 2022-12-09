const service = require('~/services/presentation.service');

exports.getMyPresentation = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) throw new Error('User not found');
    const presentationList =
      (await service.getPresentationByUserId(userId)) || [];
    return res.status(200).json(presentationList);
  } catch (error) {
    console.log('getMyPresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.getCheckCode = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(200).json({ isExist: false });
    const isExist = await service.checkPresentationExistByCode(code);
    return res.status(200).json({ isExist });
  } catch (error) {
    console.log('getCheckCode ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
