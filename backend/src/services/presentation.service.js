const PresentationModel = require('~/models/presentation.model');

exports.getPresentationByUserId = async (userId) => {
  return await PresentationModel.find({ owner: userId });
};

exports.checkPresentationExistByCode = async (code) => {
  return await PresentationModel.exists({ code });
};

exports.deletePresentationById = async (_id) => {
  return await PresentationModel.deleteOne({ _id });
};
