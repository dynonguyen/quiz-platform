const nodemailer = require('nodemailer');
const { APP_NAME } = require('~/constant');
const { getEnv } = require('~/helper');

const option = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: getEnv('NODE_MAILER_USER'),
    pass: getEnv('NODE_MAILER_PASSWORD'),
  },
};

const transporter = nodemailer.createTransport(option);

// send email
const sendEmail = async ({ to, subject, text, html, ...rest }) => {
  try {
    const res = await transporter.verify();
    if (res) {
      const mail = {
        from: '"Quiz Platform" <no-reply@accounts.quiz.com>',
        to,
        subject,
        text,
        html,
        ...rest,
      };
      const info = await transporter.sendMail(mail);
      if (info) {
        return true;
      }
    }
  } catch (err) {
    console.error('ERROR MAILER: ', err);
    return false;
  }
};

const headerHtmlMail = `<h1 style="color: #018c4c; font-size: 48px; border-bottom: solid 2px #ccc;padding-bottom: 10px">
      ${APP_NAME} - Realtime Quiz-based Learning Platform<br />
    </h1>`;
const footerHtmlVerifyMail = `<h3 style="color: red">
        Chú ý: Không đưa mã này cho bất kỳ ai,
        có thể dẫn đến mất tài khoản.<br />
        Mã chỉ có hiệu lực <i>10 phút </i> từ khi bạn nhận được mail.
    </h3>
    <h1>Cảm ơn.</h1>`;

// gửi mã xác nhận
const htmlSignupAccount = (token) => {
  return `<div>
    ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin chào anh (chị),<br />
        Mã xác nhận đăng ký tài khoản cho website ${APP_NAME} của bạn.<br />
    </h2>
    <h3 style="background: #eee;padding: 10px;">
      <i><b>${token}</b></i>
    </h3>
  ${footerHtmlVerifyMail}
  </div>`;
};

// gửi mã đổi mật khẩu
const htmlResetPassword = (token) => {
  return `<div>
    ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin chào anh (chị),<br />
        Dynon đã nhận được yêu cầu lấy lại mật khẩu từ bạn.<br />
        Đừng lo lắng, hãy nhập mã này để khôi phục:
    </h2>
    <h1 style="background: #eee;padding: 10px;">
      <i><b>${token}</b></i>
    </h1>
    ${footerHtmlVerifyMail}
  </div>`;
};

// gửi thông báo đăng nhập sai quá nhiều
const htmlWarningLogin = () => {
  return `<div>
   ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin Chào anh (chị),<br />
        Cửa hàng nghi ngờ có ai đó đã cố gắng đăng nhập vào tài khoản của quý khách.<br />
        Nếu quý khác không nhớ mật khẩu hãy nhấn vào "Quên mật khẩu" để lấy lại mật khẩu<br/>
    </h2>
    <h1>Cảm ơn.</h1>
  </div>`;
};

module.exports = {
  sendEmail,
  htmlSignupAccount,
  htmlResetPassword,
  htmlWarningLogin,
};
