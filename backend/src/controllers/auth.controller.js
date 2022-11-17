const { createUsername, getEnv } = require('~/helper');
const bcrypt = require('bcryptjs');
const {
  isExistAccount,
  createAccount,
  createUser,
  findAccount,
} = require('~/services/account.service');
const { COOKIE_EXPIRES_TIME, KEYS, ACCOUNT_TYPES } = require('~/constant');
const jwtConfig = require('~/configs/jwt.config');

exports.postRegisterAccount = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email?.toLowerCase();

    // check account existence
    const isExist = await isExistAccount(email);
    if (isExist) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    // create an account
    const newAccountId = await createAccount(
      email,
      password,
      ACCOUNT_TYPES.LOCAL,
    );
    if (!newAccountId) {
      return res
        .status(409)
        .json({ message: 'Tạo tài khoản thất bại, thử lại' });
    }

    // create an user
    const username = createUsername(email, newAccountId);
    const newUser = await createUser(newAccountId, username, name);
    if (!newUser) {
      return res
        .status(409)
        .json({ message: 'Tạo tài khoản thất bại, thử lại' });
    }

    return res.status(201).json({ message: 'Tạo tài khoản thành công' });
  } catch (error) {
    console.error('POST REGISTER ACCOUNT ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const { password } = req.body;

    // check account existence
    const account = await findAccount(email);
    if (!account) {
      return res.status(406).json({ message: 'Tài khoản không tồn tại' });
    }

    // check password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // set cookie with jwt
    const token = await jwtConfig.encodedToken(
      getEnv('JWT_SECRET_KEY') || 'quiz-secret',
      { accountId: account._id },
    );

    return res.status(200).json({
      message: 'success',
      key: KEYS.JWT_TOKEN,
      token,
      expires: new Date(Date.now() + COOKIE_EXPIRES_TIME),
    });
  } catch (error) {
    console.error('POST REGISTER ACCOUNT ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
