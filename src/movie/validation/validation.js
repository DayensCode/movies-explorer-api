const { Joi, celebrate } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../../error/bad-request-error');

const urlValidation = (url) => {
  if (isUrl(url)) {
    return url;
  }
  throw new BadRequestError('Некорректные данные');
};

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailer: Joi.string().required().custom(urlValidation),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
};
