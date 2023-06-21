const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const NotFoundError = require('../../error/not-found-error');
const ConflictError = require('../../error/conflict-error');
const BadRequestError = require('../../error/bad-request-error');
const { NODE_ENV, JWT_SECRET } = require('../../utils/config');

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '3d' },
      );
      res.send({ token });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, name, password: hash })
        .then(() => res.status(201).send({ data: { email, name } }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь уже существует'));
          }
          if (err.name === 'Validation Error') {
            return next(new BadRequestError('Некорректные данные'));
          }
          return next(err);
        });
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch(next);
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
