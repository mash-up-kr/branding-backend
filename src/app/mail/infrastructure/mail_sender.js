const nodemailer = require('nodemailer');
const mailConfig = require('../../../../config/mail-config.json');

const sendMail = async (team, application_status, applicant, title, contents) => {
  const transporter = nodemailer.createTransport({
    service: mailConfig.service,
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
      user: mailConfig.mail_id,
      pass: mailConfig.mail_password,
    },
  });

  const text = 'team : ${team} \\n 합/불 결과 : ${application_status} \\n users-name : ${applicant.name} \\n 내용 : ${contents}';
  const html = eval('`'+text+'`');

  const result = await transporter.sendMail({
    from: mailConfig.mail_id,
    to: applicant.email,
    subject: title,
    html: html,  
  });
  
  if(result.accepted.length != 0) {
    return true;
  } else {
    return false;
  }
}
  
module.exports = {
  sendMail
};
