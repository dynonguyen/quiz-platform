const mongoose = require('mongoose');
const { MAX } = require('~/constant');
const Schema = mongoose.Schema;

const verifyCodeSchema = new Schema(
  {
    code: {
      type: String,
      maxLength: MAX.VERIFY_CODE,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      maxLength: MAX.EMAIL_LEN,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const VerifyCodeModel = mongoose.model(
  'verifyCode',
  verifyCodeSchema,
  'verifyCodes',
);

module.exports = VerifyCodeModel;
