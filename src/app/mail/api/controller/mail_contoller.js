
const mailService = require('../../service/mail_service.js');


const mailSend = (req, res, next) => {
    const {role: role} = req.decoded;
    const {team, application_status, users, title, contents} = req.body;
    try {
      mailService.sendMail(role, team, application_status, users, title, contents);
      res.status('200')
      .json({
        success: true,
        message: { mail_send : 'success' }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

module.exports = {
  mailSend,
};
