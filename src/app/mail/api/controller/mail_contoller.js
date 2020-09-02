
const mailService = require('../../service/mail_service.js');

const mailSend = async (req, res, next) => {
    const {team, application_status, users, title, contents} = req.body;
    try {
      await mailService.sendMail(team, application_status, users, title, contents);
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
