const applicantStatusService = require('../../service/applicant_status_service');

async function changeApplicantStatus(req, res, next) {
  const applicantId = req.params.id;
  const {status: applicationStatus} = req.body;
  try {
    const result = await applicantStatusService.changeApplicantStatus(applicantId, applicationStatus);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      code: 400,
      message: err.message,
    });
  }
}

async function changeApplicantListStatus(req, res, next) {
  const {id_list: applicantIdList, status: applicationStatus} = req.body;
  try {
    const result = await applicantStatusService.changeApplicantListStatus(applicantIdList, applicationStatus);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      code: 400,
      message: err.message,
    });
  }
}

module.exports = {
  changeApplicantStatus,
  changeApplicantListStatus,
};
