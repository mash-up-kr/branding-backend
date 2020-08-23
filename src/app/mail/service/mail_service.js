const mailSender = require('../infrastructure/mail_sender');
const ROLE = require("../../../common/model/role");
const db = require('../../../common/model/sequelize');
const MailLog = require('../domain/mail_log');
const SEND_STATUS = require('../domain/send_status');


function sendMail(role, team, application_status, users, title, contents) {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }
  sendMailAndLog(team, application_status, users, title, contents);
}

async function sendMailAndLog(team, application_status, users, title, contents) {
  const result = await mailSender.sendMail(team, application_status, users, title, contents);

  const t = await db.sequelize.transaction();

  try {
    if(result.acceptedArray.length != 0) {
      await MailLog.create({
        send_status: SEND_STATUS.SUCCESS,
        team_name: team,
        applicant_name: result.acceptedArray.join(),
        title: title,
        content: contents,
        send_count: result.acceptedArray.length,
      });
    }

    if(result.rejectedArray.length != 0) {
      await MailLog.create({
        send_status: SEND_STATUS.FAIL,
        team_name: team,
        applicant_name: result.rejectedArray.join(),
        title: title,
        content: contents,
        send_count: result.acceptedArray.length,
      });
    }

    await t.commit();
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
}

module.exports = {
  sendMail,
};
