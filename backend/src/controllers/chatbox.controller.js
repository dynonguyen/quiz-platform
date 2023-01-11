const {
  addNewChat,
  getChatBoxByPresentationId,
  updateSeen,
} = require('~/services/chatbox.service');

exports.postAddNewChat = async (req, res) => {
  try {
    const { chat } = req.body;
    const newChat = await addNewChat(chat);
    if (newChat) res.status(200).json({ message: 'chat added successfully' });
    else res.status(400).json({ message: 'chat failed to be added' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi dịch vụ, vui lòng thử lại sao' });
  }
};

exports.getChatBoxByPresentationId = async (req, res) => {
  try {
    const { presentationId } = req.params;
    const chatBox = await getChatBoxByPresentationId(presentationId);
    if (chatBox) {
      res.status(200).json({
        ...chatBox.toObject(),
        thisUserId: req.socket.remoteAddress.toString(),
      });
    } else {
      res.status(400).json({ message: 'Get chat box failed' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Lỗi dịch vụ, vui lòng thử lại sao' });
  }
};

exports.putNewSeenUser = async (req, res) => {
  try {
    const { chat, userId } = req.body;
    if (chat.seen.includes(userId)) {
      res.status(200).json({ message: 'user has already seen this chat' });
    } else {
      const chatSeen = await updateSeen(chat._id, userId);
      if (chatSeen) res.status(200).json({ message: 'seen' });
      else res.status(400).json({ message: 'service error' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Lỗi dịch vụ, vui lòng thử lại sao' });
  }
};
