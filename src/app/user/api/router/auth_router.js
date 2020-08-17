const router = require('express').Router();
const authController = require('../controller/auth_controller.js');

router.post('/sign-in', authController.signIn);

module.exports = router;
