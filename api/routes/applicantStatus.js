
const express = require('express');
const applicantStatusService = require('../../service/applicantStatus');

const router = express.Router();
  
router.route('/')
  .get(async (req, res, next) => {
    const {role: role} = req.decoded;
    try {
      const result = await applicantStatusService.getApplicants(role);
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

router.route('/search')
  .get(async (req, res, next) => {
    const {role: role} = req.decoded;
    const value = req.query.value;
    try {
      const result = await applicantStatusService.getApplicantsByValue(role, value);
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

router.route('/teams/:teamsId')
  .get(async (req, res, next) => {
    const teamsId = req.params.teamsId;
    const {role: role} = req.decoded;
    try {
      const result = await applicantStatusService.getApplicantsByTeams(role, teamsId);
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

router.route('/status')
  .get(async (req, res, next) => {
    const applicantionStatus = req.query.status;
    const {role: role} = req.decoded;
    try {
      const result = await applicantStatusService.getApplicantsByStatus(role, applicantionStatus);
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
