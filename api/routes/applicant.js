
const express = require('express');
const applicantResume = require('../../service/applicantResume');
const applicantService = require('../../service/applicant');

const router = express.Router();

router.route('/')
  .patch(async (req, res, next) => {
    const {applicants_id, application_status} = req.body;
    const {role: role} = req.decoded;
    try {
      const result = await applicantService.changeStatus(role, applicants_id, application_status);
      res.status('200')
      .json({
        success: true,
        message: { applicant : result }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

router.route('/list')
  .patch(async (req, res, next) => {
    const {applicants_ids, application_status} = req.body;
    const {role: role} = req.decoded;
    try {
      const result = await applicantService.changeListStatus(role, applicants_ids, application_status);
      res.status('200')
      .json({
        success: true,
        message: { applicant : result }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

router.route('/:applicantId/resume')
  .get(async (req, res, next) => {
    const applicantId = req.params.applicantId;
    const {role: role} = req.decoded;
    try {
      const result = await applicantResume.getResume(role, applicantId);
      res.status('200')
      .json({
        success: true,
        message: { applicantStatus : result }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
module.exports = router;
