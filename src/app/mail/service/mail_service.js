const mailSender = require('../infrastructure/mail_sender.js');
const ROLE = require('../../../common/model/role.js');
const db = require('../../../common/model/sequelize.js');
const MailLog = require('../domain/mail_log.js');
const SEND_STATUS = require('../domain/send_status.js');
const Applicant = require('../../applicant/domain/applicant.js');

const getMailLogs = async (role) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const mailLogs = await MailLog.findAll();

  const results = [];
  for(let i = 0; i < mailLogs.length; i++) {
    const result = {
      id : mailLogs[i].id,
      team : mailLogs[i].team_name,
      mail_state : mailLogs[i].send_status,
      application_state : mailLogs[i].application_status,
      users : mailLogs[i].applicant_name,
      title : mailLogs[i].title,
      contents : mailLogs[i].content
    }
    results.push(result);
  }

  return results;
}

const sendMail = async (role, team, application_status, users, title, contents) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const ids = users.map(e => e.id);
  const applicants = await Applicant.findAll({
    where: {
      id: {
        [db.Sequelize.Op.in]: ids
      }
    }
  });

  if(applicants.length != ids.length) {
    const error = new Error('Not Found Applicant');
    error.status = 404;
    throw error;
  }

  const acceptedArray = [];
  const rejectedArray = [];

  for(let i = 0; i < applicants.length; i++) {
    const result = await mailSender.sendMail(team, application_status, applicants[i], title, contents);
  
    if(result) {
      acceptedArray.push(applicants[i]);
      applicants[i].nextStatus();
      await Applicant.update({application_status : applicants[i].application_status}, {where: {id : applicants[i].id}});
    } else {
      rejectedArray.push(applicants[i]);
    }
  }

  await saveMailLog(SEND_STATUS.SUCCESS, application_status, acceptedArray, team, title, contents);
  await saveMailLog(SEND_STATUS.FAIL, application_status, rejectedArray, team, title, contents);
}

const saveMailLog = async (SEND_STATUS, application_status, array, team, title, contents) => {
  if(array.length != 0) {
    await MailLog.create({
      send_status: SEND_STATUS,
      application_status : application_status,
      team_name: team,
      applicant_name: array.map(e => e.name).join(),
      title: title,
      content: contents,
      send_count: array.length,
    });
  }
}

module.exports = {
  sendMail,
  getMailLogs,
};
