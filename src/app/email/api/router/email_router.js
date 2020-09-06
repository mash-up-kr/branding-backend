const router = require('express').Router();

const emailController = require('../controller/email_contoller.js');

router.post('/', emailController.emailSend);

module.exports = router;
