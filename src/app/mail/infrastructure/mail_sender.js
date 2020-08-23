const nodemailer = require('nodemailer');
const mailConfig = require('../../../../config/mail-config.json');

async function sendMail(team, application_status, users, title, contents) {
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

  const acceptedArray = [];
  const rejectedArray = [];

  let text;
  let html;
  for(let i = 0; i < users.length; i++) { 
    text = "team : ${team} \n 합/불 결과 : ${application_status} \n users-name : ${users[i].name} \n 내용 : ${contents}";
    html = eval('`'+text+'`');
    const result = await transporter.sendMail({
      from: mailConfig.mail_id,
      to: users[i].email,
      subject: title,
      html: html,  
    });

    if(result.accepted.length != 0) {
      acceptedArray.push(users[i].name);
    }

    if(result.rejected.length != 0) {
      rejectedArray.push(users[i].name);
    }
  }

  return {
    acceptedArray : acceptedArray,
    rejectedArray : rejectedArray,
    };
}

export {
  sendMail
}
