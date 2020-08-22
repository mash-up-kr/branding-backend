const router = require('express').Router();

const applicantStatusController = require('../controller/applicant_status_controller.js');

router.get('/refresh', applicantStatusController.getApplicantFromSheet);
router.get('/', applicantStatusController.getApplicants);
router.get('/search', applicantStatusController.searchByValue);
router.get('/teams/:teamsId', applicantStatusController.searchByTeam);
router.get('/status', applicantStatusController.searchByStatus);

module.exports = router;
