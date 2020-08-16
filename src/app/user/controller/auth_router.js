const router = require('express').Router();
const authController = require('./auth_controller.js');

router.post('/sign-in', authController.signIn);

module.exports = router;
