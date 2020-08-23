const recruitmentService = require('../../service/recruitment_service.js');

const getRecruitment = async (req, res, next) => {
  try {
    const {role: role} = req.decoded;
    const result = await recruitmentService.getRecruitment(role);
    res.status('200')
      .json({
        code: 200,
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getRecruitment
};
