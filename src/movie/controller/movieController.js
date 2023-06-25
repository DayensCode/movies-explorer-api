const Movie = require('../model/movie');
const NotFoundError = require('../../error/not-found-error');
const BadRequestError = require('../../error/bad-request-error');
const ForbiddenError = require('../../error/forbidden-error');

function getMovies(req, res, next) {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Данные не найдены');
      } else {
        res.send(movies);
      }
    })
    .catch(next);
}

function createMovie(req, res, next) {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данные не найдены');
      } if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить не свой фильм'));
      }
      return movie.deleteOne().then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
