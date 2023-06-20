const { Joi, celebrate } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../../error/bad-request-error');

const urlValidation = (url) => {
  if (isUrl(url)) {
    return url;
  }
  throw new BadRequestError('Некорректные данные');
};

const createValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(urlValidation),
  }),
});

module.exports = {
  updateUserInfoValidation,
  createValidation,
  loginValidation,
};
