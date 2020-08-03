const router = require('express').Router()
const applicantSatuts = require('./applicantStatus.controller')

router.get('/', applicantSatuts.getApplicants);
router.get('/search', applicantSatuts.searchByValue);
router.get('/teams/:teamsId', applicantSatuts.searchByTeam);
router.get('/status', applicantSatuts.searchBySatus);

module.exports = router
