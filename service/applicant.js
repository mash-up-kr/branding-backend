const ROLE = require("../models/role");
const Applicant = require('../models/applicant');
const db = require('../models/index');

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
  changeListStatus,
  changeStatus,
}
