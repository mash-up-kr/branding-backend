const mailSender = require('../infrastructure/email_sender');
const ROLE = require('../../../common/model/role');
const db = require('../../../common/model/sequelize');
const Mail = require('../domain/email.js');
const SEND_STATUS = require('../domain/send_status');
const Applicant = require('../../applicant/domain/applicant.js');

const sendEmail = async (team, application_status, users, title, contents) => {
  const ids = users.map(e => e.id);
  const applicants = await Applicant.findAll({
    where: {
      id: {
        [db.Sequelize.Op.in]: ids
      }
    }
  });

  const acceptedArray = [];
  const rejectedArray = [];

  for(let i = 0; i < applicants.length; i++) {
    const result = await mailSender.senEmail(team, application_status, applicants[i], title, contents);
  
    if(result) {
      acceptedArray.push(applicants[i]);
      applicants[i].nextStatus();
      await Applicant.update({application_status : applicants[i].application_status}, {where: {id : applicants[i].id}});
    } else {
      rejectedArray.push(applicants[i]);
    }
  }

  await saveMailLog(SEND_STATUS.SUCCESS, acceptedArray, team, title, contents);
  await saveMailLog(SEND_STATUS.FAIL, rejectedArray, team, title, contents);
}

const saveMailLog = async (SEND_STATUS, array, team, title, contents) => {
  if(array.length != 0) {
    await Mail.create({
      send_status: SEND_STATUS,
      team_name: team,
      applicant_name: array.map(e => e.name).join(),
      title: title,
      content: contents,
      send_count: array.length,
    });
  }
}

module.exports = {
  sendEmail,
};
