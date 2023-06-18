const router = require('express').Router();
const { login } = require('../user/controller/userController');

router.post('/signin', login);

module.exports = router;
