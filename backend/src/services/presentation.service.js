const PresentationModel = require('~/models/presentation.model');

exports.getPresentationByUserId = async (userId) => {
  return await PresentationModel.find({ owner: userId });
};

exports.checkPresentationExistByCode = async (code) => {
  return await PresentationModel.exists({ code });
};
