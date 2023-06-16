const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../user/controller/userController');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfo);

module.exports = router;
