const { verifyToken, encodedToken } = require('~/configs/jwt.config');
const { sendEmail, activateAccountMail } = require('~/configs/mail.config');
const { APP_NAME } = require('~/constant');
const { generateActivateLink } = require('~/helper');
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
