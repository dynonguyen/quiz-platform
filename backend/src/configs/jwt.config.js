const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_TIME } = require('~/constant');
const { getEnv } = require('~/helper');
const secretKey = getEnv('JWT_SECRET_KEY');

const encodedToken = async (sub, expire = JWT_EXPIRES_TIME) => {
  return await jwt.sign({ iss: getEnv('JWT_ISS'), sub }, secretKey, {
    expiresIn: expire,
  });
};

const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  encodedToken,
  verifyToken,
};
