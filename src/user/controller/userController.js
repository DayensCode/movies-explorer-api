const User = require('../model/user');
const NotFoundError = require('../../error/not-found-error');

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
};
