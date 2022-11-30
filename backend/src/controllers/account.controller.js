const { verifyToken, encodedToken } = require('~/configs/jwt.config');
const { sendEmail, activateAccountMail } = require('~/configs/mail.config');
const { APP_NAME } = require('~/constant');
const bcrypt = require('bcryptjs');
const { generateActivateLink, hashPassword } = require('~/helper');
const service = require('~/services/account.service');

exports.checkVerified = async (req, res) => {
  try {
    const { accountId } = req.user;
    const isVerified = await service.isVerified(accountId);
    return res.status(200).json({ verified: Boolean(isVerified) });
  } catch (error) {
    console.log('checkVerified ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.postSendActivateAccount = async (req, res) => {
  try {
    const { accountId, email, verified } = req.user;
    if (verified) {
      return res.status(400).json({ message: 'Tài khoản đã được kích hoạt !' });
    }

    const activateLink = await generateActivateLink(accountId);

    await sendEmail({
      to: email,
      subject: `Kích hoạt tài khoản ${APP_NAME}`,
      html: activateAccountMail(activateLink),
    });

    return res.status(200).json({});
  } catch (error) {
    console.log('postSendActivateAccount ERROR: ', error);
    return res.status(400).json({ message: 'Gửi mail thất bại, thử lại' });
  }
};

exports.postActivateAccount = async (req, res) => {
  try {
    const { accountId, email, verified } = req.user;
    const { code } = req.body;
    if (verified) return res.status(200).json({});

    if (!code) throw new Error('Code not found !');
    const decoded = verifyToken(code);

    if (!decoded) {
      throw new Error('Invalid code');
    }

    const { sub } = decoded;

    if (sub.accountId === accountId && sub.type === 'activate') {
      await service.updateAccountById(accountId, { verified: true });
      const newToken = await encodedToken({ accountId, email, verified: true });
      return res.status(200).json({ token: newToken });
    }

    throw new Error('Invalid code');
  } catch (error) {
    console.log('postActivateAccount ERROR: ', error);
    return res.status(400).json({ message: 'Failed' });
  }
};

exports.checkIsMatchPassword = async (req, res) => {
  try {
    const { oldPassword } = req.body;
    const { email } = req.user;
    const userPassword = await service
      .findAccount(email)
      .then((res) => res.password);

    const isMatch = await bcrypt.compare(oldPassword, userPassword);

    if (isMatch) {
      return res.status(200).json({ message: 'Mật khẫu cũ trùng khớp' });
    } else return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Có lỗi xảy ra, vui lòng kiểm tra lại' });
  }
};

exports.postUpdatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { accountId, email } = req.user;
    const userPassword = await service
      .findAccount(email)
      .then((res) => res.password);
    const isMatch = await bcrypt.compare(newPassword, userPassword);
    if (isMatch) {
      return res
        .status(400)
        .json({ message: 'Mật khẩu mới trùng với mật khẩu cũ' });
    } else {
      const password = await hashPassword(newPassword);
      await service.updateAccountById(accountId, {
        password: password,
      });
      return res.status(200).json({ message: 'Thay đổi mật khẩu thành công' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Có lỗi xảy ra, vui lòng kiểm tra lại' });
  }
};
