const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MAX } = require('~/constant');

const chatBoxSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    presentationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'presentation',
    },
    chatText: {
      type: String,
      maxLength: MAX.CHAT_TEXT,
      required: true,
      trim: true,
    },
    seen: [{ type: Schema.Types.ObjectId, ref: 'user', default: [] }],
  },
  { timestamps: true },
);

const chatBoxModel = mongoose.model('chatbox', chatBoxSchema, 'chatbox');

module.exports = chatBoxModel;
