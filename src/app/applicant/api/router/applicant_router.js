const router = require('express').Router();

const applicantController = require('../controller/applicant_controller.js');

router.get('/', applicantController.getApplicantList);
router.get('/:id', applicantController.getResume);
router.post('/', applicantController.updateApplicants);

module.exports = router;
