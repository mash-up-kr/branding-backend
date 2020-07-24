const ROLE = require("../models/role");
const Applicant = require('../models/applicant');

async function changeStatus(role, applicantId, applicantionStatus) {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const applicant = await Applicant.findOne({
    where : {
      id : applicantId,
    }
  });

  await applicant.update({ application_status:applicantionStatus, update_time: Date.now() });

  return {
    applicant : applicant
  }
}

export {
  changeStatus
}