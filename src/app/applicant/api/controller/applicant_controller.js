const resumeService = require('../../service/resume_service.js');
const applicantService = require('../../service/applicant_service.js');

const getResume = async (req, res, next) => {
  try {
    const applicantId = req.params.id;
    const {role: role} = req.decoded;
    const result = await resumeService.getResume(role, applicantId);
    res.status('200')
      .json({
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const changeStatus = async (req, res, next) => {
  const applicantId = req.params.id;
  const {application_status} = req.body;
  const {role: role} = req.decoded;
  try {
    const result = await applicantService.changeStatus(role, applicantId, application_status);
    res.status('200')
    .json({
      success: true,
      message: { applicant : result }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const changeListStatus = async (req, res, next) => {
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
};

module.exports = {
  getResume,
  getApplicantFromSheet,
  changeStatus,
  changeListStatus,
};
