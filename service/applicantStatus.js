const ROLE = require("../models/role");
const Recruiting = require('../models/recruiting');
const Team = require('../models/team');
const ApplicantStatus = require('../models/applicantStatus');

async function getApplicants(role) {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const latelyRecruiting = await Recruiting.findOne({
    limit: 1,
    order: [ [ 'id', 'DESC' ]]
  });

  const teams = await Team.findAll({
    attributes: ['id', 'name'],
    where: {
      recruiting_id : latelyRecruiting.id,
    }
  })

  const applicants = await ApplicantStatus.findAllApplicantStatus(latelyRecruiting.id);

  const result = {
    recruitingId : latelyRecruiting.id,
    teams : teams,
    applicantsSize : applicants.length,
    applicants : applicants
  }  

  return result;
}

export {
  getApplicants
}