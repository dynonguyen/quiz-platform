const { MAX } = require('~/constant');
const VerifyCodeModel = require('~/models/verify-code.model');

exports.saveVerifyCode = async (code = '', email = '') => {
  try {
    // delete old code
    await VerifyCodeModel.deleteOne({ email });

    const newItem = await VerifyCodeModel.create({ code, email });
    return newItem;
  } catch (error) {
    throw error;
  }
};

exports.checkVerifyCode = async (code = '', email = '') => {
  try {
    const item = await VerifyCodeModel.findOne({ email, code });

    if (!item) {
      return { status: false, message: 'Hãy gửi mã để nhận mã xác thực.' };
    }

    if (item.code !== code) {
      return { status: false, message: 'Mã xác thực không đúng.' };
    }

    const d = new Date().getTime(),
      createdDate = new Date(item.createdDate).getTime();

    if (d - createdDate > MAX.VERIFY_TIME) {
      return {
        status: false,
        message: 'Mã xác thực đã hết hiệu lực. Hãy lấy một mã khác',
      };
    }

    return { status: true, message: 'valid' };
  } catch (error) {
    throw error;
  }
};

exports.removeVerifyCode = async (email = '') => {
  await VerifyCodeModel.deleteOne({ email });
};
