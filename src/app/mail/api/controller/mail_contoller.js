
const mailService = require('../../service/mail_service.js');

const mailSend = async (req, res, next) => {
    const {role: role} = req.decoded;
    const {team, application_status, users, title, contents} = req.body;
    try {
      await mailService.sendMail(role, team, application_status, users, title, contents);
      res.status('200')
      .json({
        code: 200,
        data: { mail_send : 'success' }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

const getMailLogs = async (req, res, next) => {
  const {role: role} = req.decoded;
  try {
    const results = await mailService.getMailLogs(role);
    res.status('200')
    .json({
      code: 200,
      data : results,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  mailSend,
  getMailLogs,
};
