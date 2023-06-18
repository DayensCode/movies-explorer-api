const router = require('express').Router();
const routeUsers = require('./users');
const routeMovies = require('./movies');
const routeSignin = require('./signin');
const routeSignup = require('./signup');
const NotFoundError = require('../error/not-found-error');

router.use('/', routeSignin);
router.use('/', routeSignup);
router.use('/users', routeUsers);
router.use('/movies', routeMovies);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
