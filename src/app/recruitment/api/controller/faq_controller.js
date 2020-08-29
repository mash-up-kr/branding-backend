const faqService = require('../../service/faq_service.js');

const getFaq = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const result = await faqService.getFaq(recruitmentId);
    res.status('200')
      .json({
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
    const faq = req.body;
    const result = await faqService.insertFaq(recruitmentId, faq);
    res.status('200')
      .json({
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteFaq = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const faqId = req.params.faq_id;
    const result = await faqService.deleteFaq(recruitmentId, faqId);
    res.status('200')
      .json({
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getFaq,
  insertFaq,
  deleteFaq,
};
