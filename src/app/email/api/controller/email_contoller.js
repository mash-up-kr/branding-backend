
const emailService = require('../../service/email_service.js');

const emailSend = async (req, res, next) => {
    const {team, application_status, users, title, contents} = req.body;
    try {
      await emailService.sendEmail(team, application_status, users, title, contents);
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
  emailSend,
};
