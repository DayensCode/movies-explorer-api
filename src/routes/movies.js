const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../movie/controller/movieController');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
