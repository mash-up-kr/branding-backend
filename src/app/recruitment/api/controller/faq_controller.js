const faqService = require('../../service/faq_service.js');

const getFaq = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const {role: role} = req.decoded;
    const result = await faqService.getFaq(role, recruitmentId);
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

const insertFaq = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const {role: role} = req.decoded;
    const faq = req.body;
    const result = await faqService.insertFaq(role, recruitmentId, faq);
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
  getFaq,
  insertFaq
};
