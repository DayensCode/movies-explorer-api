const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../movie/validation/validation');
const { getMovies, createMovie, deleteMovie } = require('../movie/controller/movieController');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
