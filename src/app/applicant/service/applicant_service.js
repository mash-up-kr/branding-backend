const Recruitment = require('../../recruitment/domain/recruitment.js');
const Team = require('../../recruitment/domain/team.js');
const APPLICATION_STATUS = require('../../applicant/domain/application_status.js');
const Applicant = require('../../applicant/domain/applicant.js');
const applicantStatusRepository = require('../infrastructure/applicant_status_repository.js');
const db = require('../../../common/model/sequelize.js');
const HttpError = require('http-errors');

// TODO(sanghee): Need to support filter options (team_id, status)
async function getApplicantList(teamId, applicantStatus) {
  const latelyRecruitment = await Recruitment.findOne({
    limit: 1,
    order: [['id', 'DESC']],
  });

  const teamList = await Team.findAll({
    attributes: ['id', 'name'],
    where: {
      recruitment_id: latelyRecruitment.id,
    },
  });

  const applicantList = await applicantStatusRepository.findAllApplicants(latelyRecruitment.id);
  const applicantListLength = applicantList.length;

  const parsedApplicantList = applicantList.map(item => ({
    id: item.id,
    team: {
      id: item.team_id,
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
      team_id: applicant.team_id,
      application_status: APPLICATION_STATUS.APPLICATION_COMPLETION,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
    });
    return result;
  } catch (err) {
    throw HttpError(500, 'Error while create applicant');
  }
}

async function changeApplicantStatus(applicantId, applicationStatus) {
  const applicant = await Applicant.findOne({
    where: {
      id: applicantId,
    },
  });

  if (!applicant) {
    throw HttpError(404, `Error while find applicant by id`);
  }

  try {
    await applicant.update({application_status: applicationStatus, update_time: Date.now()});
  } catch (err) {
    throw HttpError(500, 'Error while update applicant status');
  }

  return {status: applicationStatus};
}

async function changeApplicantListStatus(applicantIdList, applicationStatus) {
  const applicantList = await Applicant.findAll({
    where: {
      id: {
        [db.Op.in]: applicantIdList,
      },
    },
  });

  const transaction = await db.sequelize.transaction();

  try {
    for (const applicant of applicantList) {
      await applicant.update(
          {application_status: applicationStatus, update_time: Date.now()},
          {transaction},
      );
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw HttpError(500, 'Error while update applicants status'); // 500
  }
  return {status: applicationStatus};
}

async function clearAllApplicantList(teamId) {
  try {
    await Applicant.destroy({
      where: {
        team_id: teamId,
      },
    });
  } catch (err) {
    throw HttpError(500, `Error while delete all applicants (teamId:${teamId})`);
  }
}

module.exports = {
  getApplicantList,
  createApplicant,
  changeApplicantStatus,
  changeApplicantListStatus,
  clearAllApplicantList,
};
