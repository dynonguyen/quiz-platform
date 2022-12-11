const { MAX } = require('~/constant');
const { generateUniqueString } = require('~/helper');
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

exports.getPresentationByCode = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw new Error('code not found');
    }

    const presentation = await service.getPresentationByCode(code);
    return res.status(200).json(presentation.toObject());
  } catch (error) {
    console.log('getPresentationByCode ERROR: ', error);
    return res.status(400).json({ msg: 'presentation not found' });
  }
};

exports.deletePresentation = async (req, res) => {
  try {
    const { presentationId } = req.params;
    const delRes = await service.deletePresentationById(presentationId);
    if (delRes) {
      return res.status(200).json({ msg: 'success' });
    }
    throw new Error('Delete failed');
  } catch (error) {
    console.log('deletePresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.postNewPresentation = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const { userId } = req.user;

    let code = generateUniqueString(MAX.PRESENTATION_CODE);
    let count = 0;
    while (count <= 10) {
      const isExist = await service.checkPresentationExistByCode(code);
      if (isExist) {
        count++;
        code = generateUniqueString(MAX.PRESENTATION_CODE);
      } else break;
    }

    const newPresentation = await service.createNewPresentation({
      name,
      desc,
      code,
      owner: userId,
    });
    if (newPresentation) {
      return res.status(201).json({ msg: 'Success' });
    }

    return res.status(400).json({ msg: 'Failed' });
  } catch (error) {
    console.log('postNewPresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
