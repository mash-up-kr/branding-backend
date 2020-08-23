const router = require('express').Router();
const recruitmentController = require('../controller/recruitment_controller.js');
const faqController = require('../controller/faq_controller.js');

router.get('/', recruitmentController.getRecruitment);
router.put('/:id', recruitmentController.updateRecruitment);
router.get('/:recruitment_id/faq', faqController.getFaq);

module.exports = router;
