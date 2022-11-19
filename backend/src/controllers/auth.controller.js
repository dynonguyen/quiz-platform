const { createUsername } = require('~/helper');
const bcrypt = require('bcryptjs');
const {
  isExistAccount,
  createAccount,
  createUser,
  findAccount,
} = require('~/services/account.service');
const { ACCOUNT_TYPES, MAX } = require('~/constant');
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
  const errorMsg = 'Tài khoản không tồn tại hoặc mật khẩu không chính xác';
  try {
    const email = req.body.email?.toLowerCase();
    const { password } = req.body;

    // check account existence
    const account = await findAccount(email);
    if (!account) {
      return res.status(400).json({ message: errorMsg });
    }

    // check password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: errorMsg });
    }

    // set cookie with jwt
    const token = await jwtConfig.encodedToken({
      accountId: account._id,
      email,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('POST REGISTER ACCOUNT ERROR: ', error);
    return res.status(400).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.postGoogleLogin = async (req, res) => {
  try {
    const { user } = req;
    if (!Boolean(user)) {
      return res.status(401).json({ message: 'Đăng nhập thất bại, thử lại' });
    }

    const { email, name, avt, id, type } = user;

    const account = await findAccount(email);
    let accountId = null;

    // If not exist then create a new account
    if (!account) {
      accountId = await createAccount(email, '', type);
      if (!accountId) {
        return res.status(401).json({ message: 'Đăng nhập thất bại, thử lại' });
      }

      const username = `${name}-${id}`.slice(0, MAX.USER_NAME).toLowerCase();
      userLogged = await createUser(accountId, username, name, avt);
    } else {
      accountId = account._id;
    }

    // Generate token
    const token = await jwtConfig.encodedToken({ accountId, email });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('LOGIN WITH GG ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
