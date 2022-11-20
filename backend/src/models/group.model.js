const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    desc: { type: String, trim: true },
    code: { type: String, trim: true, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    coOwners: [{ type: Schema.Types.ObjectId, ref: 'user', default: [] }],
    members: [{ type: Schema.Types.ObjectId, ref: 'user', default: [] }],
  },
  { timestamps: true },
);

const GroupModel = mongoose.model('group', groupSchema, 'groups');

module.exports = GroupModel;
