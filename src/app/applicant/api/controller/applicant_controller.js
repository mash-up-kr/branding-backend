const applicantService = require('../../service/applicant_service.js');
const resumeService = require('../../service/resume_service.js');
const HttpError = require('http-errors');
let updateApplicantsMutex = false;

async function getApplicantList(req, res, next) {
  const {team: teamId, status: applicantStatus} = req.query;
  // TODO(sanghee): Need to support filter options (team_id, status)
  try {
    const result = await applicantService.getApplicantList(teamId, applicantStatus);
    res.status('200').json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function getResume(req, res, next) {
  const applicantId = req.params.id;
  try {
    const result = await resumeService.getResume(applicantId);
    res.status('200').json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function changeApplicantStatus(req, res, next) {
  const applicantId = req.params.id;
  const {status: applicationStatus} = req.body;
  try {
    const result = await applicantService.changeApplicantStatus(applicantId, applicationStatus);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function changeApplicantListStatus(req, res, next) {
  const {id_list: applicantIdList, status: applicationStatus} = req.body;
  try {
    const result = await applicantService.changeApplicantListStatus(applicantIdList, applicationStatus);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

async function updateApplicants(req, res, next) {
  if (updateApplicantsMutex) {
    next(HttpError(500, 'Already processing request'));
    return;
  }

  try {
    updateApplicantsMutex = true;
    await resumeService.updateAllResume();
    res.status(200).json({
      data: {},
    });
  } catch (err) {
    next(err);
  } finally {
    updateApplicantsMutex = false;
  }
}

module.exports = {
  getApplicantList,
  getResume,
  changeApplicantStatus,
  changeApplicantListStatus,
  updateApplicants,
};
