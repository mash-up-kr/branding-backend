const router = require('express').Router();

const applicantStatus = require('./applicant_status_controller.js');

router.get('/', applicantStatus.getApplicants);
router.get('/search', applicantStatus.searchByValue);
router.get('/teams/:teamsId', applicantStatus.searchByTeam);
router.get('/status', applicantStatus.searchByStatus);

module.exports = router;
