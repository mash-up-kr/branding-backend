const Recruitment = require('../../recruitment/domain/recruiting');
const Team = require('../../team/domain/team');
const APPLICATION_STATUS = require('../../applicant/domain/application_status');
const Applicant = require('../../applicant/domain/applicant');
const applicantStatusRepository = require('../infrastructure/applicant_status_repository');

// TODO(sanghee): Need to support filter options (team_id, status)
async function getApplicantList(teamId, applicantStatus) {
  const latelyRecruitment = await Recruitment.findOne({
    limit: 1,
    order: [['id', 'DESC']],
  });

  const teamList = await Team.findAll({
    attributes: ['id', 'name'],
    where: {
      recruiting_id: latelyRecruitment.id,
    },
  });

  const applicantList = await applicantStatusRepository.findAllApplicants(latelyRecruitment.id);
  const applicantListLength = applicantList.length;

  const parsedApplicantList = applicantList.map(item => ({
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
    team_list: teamList,
    applicant_list_length: applicantListLength,
    applicant_list: parsedApplicantList,
    timestamp: timestamp,
  };

  return result;
}

async function createApplicant(applicant) {
  try {
    const result = await Applicant.create({
      teams_id: applicant.teams_id,
      application_status: APPLICATION_STATUS.APPLICATION_COMPLETION,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
    });
    return result;
  } catch (err) {
    throw Error('Error while create applicant');
  }
}

module.exports = {
  getApplicantList,
  createApplicant,
};
