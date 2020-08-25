const router = require('express').Router();

const mailController = require('../controller/mail_contoller.js');

router.post('/', mailController.mailSend);
router.get('/', mailController.getMailLogs);

module.exports = router;
