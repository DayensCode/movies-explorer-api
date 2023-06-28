const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error/unauthorized-error');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
