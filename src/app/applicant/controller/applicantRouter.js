const router = require('express').Router();
const applicant = require('./applicant.controller');

router.get('/', applicant.getApplicantFromSheet);
router.get('/:id', applicant.getResume)
router.patch('/:id', applicant.changeSatuts);
router.patch('/', applicant.changeListSatuts);

module.exports = router
