const { verifyToken } = require('~/configs/jwt.config');

exports.authorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Authorization header not found !');

    const token = authorization.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded.sub;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log('Authorization Error: ', error);
    return res
      .status(401)
      .json({ msg: 'Unauthorized - Token invalid or expired' });
  }
};
