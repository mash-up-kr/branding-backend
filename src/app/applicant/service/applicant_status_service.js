const Applicant = require('../domain/applicant.js');
const db = require('../../../common/model/sequelize.js');

async function changeApplicantStatus(applicantId, applicationStatus) {
  const applicant = await Applicant.findOne({
    where: {
      id: applicantId,
    },
  });

  if (!applicant) {
    throw Error(`Error while find applicant by id`);
  }

  try {
    await applicant.update({application_status: applicationStatus, update_time: Date.now()});
  } catch (err) {
    throw Error('Error while update applicant status');
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
    throw Error('Error while update applicants status');
  }
  return {status: applicationStatus};
}

module.exports = {
  changeApplicantStatus,
  changeApplicantListStatus,
};
