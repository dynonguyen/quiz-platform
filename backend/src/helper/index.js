const bcrypt = require('bcryptjs');
const { encodedToken } = require('~/configs/jwt.config');
const { MAX } = require('~/constant');

function getEnv(key) {
  return process.env[key];
}

// @fn: create an username for user by email, account id
// @ex: dyno2000@email.com, id: 127391212 => dyno200012739
function createUsername(email = '', id = '') {
  const idStr = id.toString();
  return (
    email.toString().split('@')[0] + idStr.slice(idStr.length - 5, idStr.length)
  );
}

async function hashPassword(password = '') {
  const saltRounds = parseInt(this.getEnv('SALT_ROUND'));
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
}

async function generateActivateLink(accountId) {
  const code = await encodedToken(
    { type: 'activate', accountId },
    MAX.VERIFY_TIME,
  );
  return `${getEnv('CORS_ORIGIN')}/settings/activation?code=${code}`;
}

module.exports = {
  getEnv,
  createUsername,
  generateActivateLink,
  hashPassword,
};
