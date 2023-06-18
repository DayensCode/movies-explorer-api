const router = require('express').Router();
const { createUser } = require('../user/controller/userController');

router.post('/signup', createUser);

module.exports = router;
