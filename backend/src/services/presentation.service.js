const PresentationModel = require('~/models/presentation.model');

exports.getPresentationByUserId = async (userId) => {
  return await PresentationModel.find({ owner: userId });
};

exports.getPresentationByCode = async (code) => {
  return await PresentationModel.findOne({ code })
    .populate('owner')
    .populate('chats.ownerId');
};

exports.checkPresentationExistByCode = async (code) => {
  return await PresentationModel.exists({ code });
};

exports.checkPresentationExistByQuery = async (query) => {
  return await PresentationModel.exists(query);
};

exports.deletePresentationById = async (_id) => {
  return await PresentationModel.deleteOne({ _id });
};

exports.createNewPresentation = async (presentation = {}) => {
  return await PresentationModel.create({ ...presentation });
};

exports.updatePresentation = async (query, setFields) => {
  return await PresentationModel.updateOne(query, { $set: setFields });
};

exports.getAnswerOfUser = async (query, userId, slideId) => {
  const presentation = await PresentationModel.findOne(query);
  const slide = presentation.slides.filter((slide) => slide.id === slideId);
  return slide[0].answers.filter((answer) => answer.userId === userId);
};
