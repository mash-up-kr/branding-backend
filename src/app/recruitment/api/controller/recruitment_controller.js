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

const updateRecruitment = async (req, res, next) => {
  try {
    const recruitmentId = req.params.id;
    const {role: role} = req.decoded;
    const recruitment = req.body;
    const result = await recruitmentService.updateRecruitment(role, recruitmentId, recruitment);
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
  getRecruitment,
  updateRecruitment
};
