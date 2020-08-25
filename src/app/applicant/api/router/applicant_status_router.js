const router = require('express').Router();
const applicantStatusController = require('../controller/applicant_status_controller.js');

router.patch('/:id', applicantStatusController.changeApplicantStatus);
router.patch('/', applicantStatusController.changeApplicantListStatus);

module.exports = router;

