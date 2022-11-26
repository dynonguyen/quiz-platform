const nodemailer = require('nodemailer');
const { APP_NAME, MAX } = require('~/constant');
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

const sendEmail = async ({ to, subject, text, html, ...rest }) => {
  try {
    const res = await transporter.verify();
    if (res) {
      const mail = {
        from: `"${APP_NAME}" <no-reply@accounts.quiz.com>`,
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

const activateAccountMail = (link) => {
  return `
  <div style="max-width: 776px; margin: 0 auto; font-family: sans-serif;">
    <h2 style="color: #444">Xin chào,</h2>

    <p style="color: #666;line-height: 1.5;margin: 12px auto;">
      Bạn có một lời mời tham gia vào nhóm <strong>ABC</strong> trong <strong>${APP_NAME}</strong> từ người dùng
      <b>xyz</b>. Bạn có thể tham gia nhóm bằng các nhấn vào nút <b>"Tham gia"</b> bên dưới.
      <br />
    </p>


    <div style="margin:24px;text-align: center;">
      <a style="text-decoration: none;" href="${link}" target="_blank">
        <button style="border: none; background: #2065D1; padding: 12px 16px; outline: none;color: #fff;border-radius: 8px;cursor: pointer;font-weight: 500;font-size: 18px">Xác minh tài khoản</button>
      </a>
    </div>

    <p style="color: #666;line-height: 1.5;margin: 12px auto;text-align: center;">Hoặc, bạn có thể sao chép và dán liên kết bên dưới vào trình duyệt.</p>

    <div style="padding: 8px; background-color: #e5e5e5; text-align: center;">
      <a href="${link}" target="_blank" style="color: #2065D1;">
        ${link}
      </a>
    </div>
  </div>`;
};

const inviteJoinGroupMail = (link, groupName, senderName) => {
  return `
  <div style="max-width: 776px; margin: 0 auto; font-family: sans-serif;">
    <h2 style="color: #444">Xin chào,</h2>

    <p style="color: #666;line-height: 1.5;margin: 12px auto;">
      Bạn có một lời mời tham gia vào nhóm <strong>${groupName}</strong> trong <strong>${APP_NAME}</strong> từ người dùng
      <b>${senderName}</b>. Bạn có thể tham gia nhóm bằng các nhấn vào nút <b>"Tham gia"</b> bên dưới.
      <br />
    </p>


    <div style="margin:24px;text-align: center;">
      <a style="text-decoration: none;" href="${link}" target="_blank">
        <button
          style="border: none; background: #2065D1; padding: 12px 16px; outline: none;color: #fff;border-radius: 8px;cursor: pointer;font-weight: 500;font-size: 18px">Tham
          gia</button>
      </a>
    </div>

    <p style="color: #666;line-height: 1.5;margin: 12px auto;text-align: center;">Hoặc, bạn có thể sao chép và dán liên
      kết bên dưới vào trình duyệt.</p>

    <div style="padding: 8px; background-color: #e5e5e5; text-align: center;">
      <a href="${link}" target="_blank" style="color: #2065D1;">
        ${link}
      </a>
    </div>
  </div>`;
};

module.exports = {
  sendEmail,
  activateAccountMail,
  inviteJoinGroupMail,
};
