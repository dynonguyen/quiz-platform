const chatBoxModel = require('~/models/chatbox.model');

exports.getChatBoxByPresentationId = async (presentationId) => {
  return await chatBoxModel
    .find({ presentationId: presentationId })
    .populate('userId');
};

exports.getChatById = async (id) => {
  return await chatBoxModel.findById(id);
};

exports.addNewChat = async (chat = {}) => {
  return await chatBoxModel.create(chat);
};

exports.updateSeen = async (chatId, userId) => {
  return await chatBoxModel.updateOne(
    { _id: chatId },
    { $push: { seen: userId } },
  );
};

// exports.isSeen = async (chatId, userId) => {
//   return await chatBoxModel.find({ _id: chatId, seen: { $in: [userId] } });
// };
