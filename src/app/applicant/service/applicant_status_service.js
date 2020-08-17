const ROLE = require("../../../common/model/role.js");
const applicantStatusRepository = require('../infrastructure/applicant_status_repository.js');
const Recruiting = require('../../recruitment/domain/recruiting.js');
const Team = require('../../team/domain/team.js');

const getApplicants = async role => {
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
  });

  const applicants = await applicantStatusRepository.findAllApplicants(latelyRecruiting.id);

  const applicantsLength = applicants.length;

  const parsedApplicants = applicants.map(item => ({
    id: item.id,
    team: {
      id: item.teams_id,
      name: item.teams_name,
    },
    name: item.name,
    email: item.email,
    phone: item.phone,
    timestamp: Math.floor(item.application_time / 1000),
    status: item.application_status,
  }));

  const timestamp = Math.floor(Date.now() / 1000);

  const result = {
    team_list: teams,
    applicant_list_length: applicantsLength,
    applicant_list: parsedApplicants,
    timestamp: timestamp,
  };

  return result;
};

const getApplicantsByValue = async (role, value) => {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }
  
  const latelyRecruiting = await Recruiting.findOne({
    limit: 1,
    order: [[ 'id', 'DESC' ]]
  });

  const applicants = await applicantStatusRepository.findAllApplicantStatusByValue(latelyRecruiting.id, value);
  
  const result = {
    recruitingId : latelyRecruiting.id,
    applicantsSize : applicants.length,
    applicants : applicants
  };

  return result;
};

const getApplicantsByTeams = async (role, teamsId) => {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const latelyRecruiting = await Recruiting.findOne({
    limit: 1,
    order: [[ 'id', 'DESC' ]]
  });
  
  const applicants = await applicantStatusRepository.findAllApplicantStatusByTeams(latelyRecruiting.id, teamsId);
  
  const result = {
    recruitingId : latelyRecruiting.id,
    applicantsSize : applicants.length,
    applicants : applicants
  };

  return result;
};

const getApplicantsByStatus = async (role, applicantionStatus) => {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const latelyRecruiting = await Recruiting.findOne({
    limit: 1,
    order: [[ 'id', 'DESC' ]]
  });
  
  const applicants = await applicantStatusRepository.findAllApplicantStatusByStatus(latelyRecruiting.id, applicantionStatus);

  const result = {
    recruitingId : latelyRecruiting.id,
    applicantsSize : applicants.length,
    applicants : applicants
  };

  return result;
};

module.exports = {
  getApplicants,
  getApplicantsByValue,
  getApplicantsByTeams,
  getApplicantsByStatus,
};
