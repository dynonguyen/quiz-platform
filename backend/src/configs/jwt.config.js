const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_TIME } = require('~/constant');
const { getEnv } = require('~/helper');

const encodedToken = async (secretKey, user, expire = JWT_EXPIRES_TIME) => {
  return await jwt.sign({ iss: getEnv('JWT_ISS'), sub: user }, secretKey, {
    expiresIn: expire,
  });
};

module.exports = {
  encodedToken,
};
