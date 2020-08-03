const ROLE = require("../../../common/model/role");
const db = require('../../../common/model/sequelize');
const Applicant = require('../domain/applicant');
const APPLICATION_STATUS = require("../domain/applicationStatus");

async function clearApplicants() {
  await Applicant.destroy({where: {}});
}

async function updateApplicant(obj) {

  const result = await Applicant.create({
    teams_id: obj.teams_id,
    application_status: APPLICATION_STATUS.APPLICATION_COMPLETION,
    name: obj.name,
    email: obj.email,
    phone: obj.phone,
  });

  return result;
}

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

async function changeListStatus(role, applicantIds, applicantionStatus) {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const t = await db.sequelize.transaction();

  const applicants = await Applicant.findAll({
    where: {
      id: {
        [db.Sequelize.Op.in]: applicantIds
      }
    }
  });

  try {
    for(let i = 0; i < applicants.length; i++) {
     await applicants[i].update(
       { application_status:applicantionStatus, update_time: Date.now() },
       { transaction: t });
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
  }

  return {
    applicants : applicants
  }
}

export {
  clearApplicants,
  updateApplicant,
  changeListStatus,
  changeStatus,
}
