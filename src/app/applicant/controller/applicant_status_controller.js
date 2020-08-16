const applicantStatusService = require('../service/applicant_status_service.js');

exports.getApplicants = async (req, res, next) => {
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
  }; 

exports.searchByValue = async (req, res, next) => {
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
  }

exports.searchByTeam = async (req, res, next) => {
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
  }

exports.searchBySatus = async (req, res, next) => {
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
  }

