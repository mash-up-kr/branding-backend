const Recruitment = require('../../recruitment/domain/recruitment.js');
const Team = require('../../recruitment/domain/team.js');
const APPLICATION_STATUS = require('../../applicant/domain/application_status.js');
const Applicant = require('../../applicant/domain/applicant.js');
const applicantStatusRepository = require('../infrastructure/applicant_status_repository.js');
const db = require('../../../common/model/sequelize.js');

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
    console.error(err);
    throw Error('Error while create applicant'); // 500
  }
}

async function changeApplicantStatus(applicantId, applicationStatus) {
  const applicant = await Applicant.findOne({
    where: {
      id: applicantId,
    },
  });

  if (!applicant) {
    throw Error(`Error while find applicant by id`); // 404
  }

  try {
    await applicant.update({application_status: applicationStatus, update_time: Date.now()});
  } catch (err) {
    console.error(err);
    throw Error('Error while update applicant status'); // 500
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
    console.error(err);
    throw Error('Error while update applicants status'); // 500
  }
  return {status: applicationStatus};
}

async function clearAllApplicantList(teamId) {
  try {
    await Applicant.destroy({
      where: {
        teams_id: teamId,
      },
    });
  } catch (err) {
    throw Error(`Error while delete all applicants (teamId:${teamId}`); // 500
  }
}

module.exports = {
  getApplicantList,
  createApplicant,
  changeApplicantStatus,
  changeApplicantListStatus,
  clearAllApplicantList,
};
