const router = require('express').Router();
const recruitmentController = require('../controller/recruitment_controller.js');

router.get('/', recruitmentController.getRecruitment);
router.put('/:id', recruitmentController.updateRecruitment);

module.exports = router;
