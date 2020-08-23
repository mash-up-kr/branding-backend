const router = require('express').Router();
const recruitmentController = require('../controller/recruitment_controller.js');

router.get('/', recruitmentController.getRecruitment);

module.exports = router;
