const router = require('express').Router();
const recruitmentController = require('../controller/recruitment_controller.js');
const faqController = require('../controller/faq_controller.js');
const teamController = require('../controller/team_controller.js');

router.get('/', recruitmentController.getRecruitment);
router.put('/:id', recruitmentController.updateRecruitment);
router.get('/:recruitment_id/faq', faqController.getFaq);
router.post('/:recruitment_id/faq', faqController.insertFaq);
router.delete('/:recruitment_id/faq/:faq_id', faqController.deleteFaq);
router.get('/:recruitment_id/teams', teamController.getTeams);
router.post('/:recruitment_id/teams', teamController.insertTeam);
router.delete('/:recruitment_id/teams/:team_id', teamController.deleteTeam);

module.exports = router;
