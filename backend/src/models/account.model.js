const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { MAX, ACCOUNT_TYPES } = require('~/constant');
const { getEnv } = require('~/helper');

const accountSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: MAX.EMAIL_LEN,
  },
  password: {
    type: String,
    default: '',
    maxLength: MAX.PASSWORD_LEN,
  },
  authType: {
    type: String,
    enum: Object.keys(ACCOUNT_TYPES).map((key) => ACCOUNT_TYPES[key]),
    default: ACCOUNT_TYPES.LOCAL,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// hash password with bcrypt
// Note: callback should be a normal function -> use 'this'
accountSchema.pre('save', async function (next) {
  try {
    if (Boolean(this.password)) {
      const saltRounds = parseInt(getEnv('SALT_ROUND'));
      //hashing password...
      const hashPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashPassword;
      next();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const AccountModel = mongoose.model('account', accountSchema, 'accounts');

module.exports = AccountModel;
