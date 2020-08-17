const router = require('express').Router();

const applicantController = require('../controller/applicant_controller.js');

router.get('/:id', applicantController.getResume)
router.patch('/:id', applicantController.changeStatus);
router.patch('/', applicantController.changeListStatus);

module.exports = router;
