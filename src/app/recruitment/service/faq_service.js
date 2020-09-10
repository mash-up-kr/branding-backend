const FAQ = require('../domain/faq.js');
const Recruitment = require('../domain/recruitment.js');
const HttpError = require('http-errors');

const getFaq = async (recruitmentId) => {
  const faqList = await FAQ.findAll({ where: { recruitment_id: recruitmentId}});

  const results = [];
  for(let i = 0; i < faqList.length; i++) {
    const result = {
      id : faqList[i].id,
      question : faqList[i].question,
      answer : faqList[i].answer,
    }
    results.push(result);
  }

  return results;
};

const insertFaq = async (recruitmentId, faq) => {
  const recruiting = await Recruitment.findOne({
    where: {
      id: recruitmentId
    }
  });

  if(!recruiting) {
    throw HttpError(404, 'Not Found Recruitment');
  }

  const result = await FAQ.create({
    recruitment_id: recruitmentId,
    question: faq.question,
    answer: faq.answer,
  });

  return {
    id : result.id,
    question : result.question,
    answer : result.answer,
  };
};

const deleteFaq = async (recruitmentId, faqId) => {
 const result = await FAQ.destroy({
    where: {
        id: faqId, recruitment_id: recruitmentId
    }
  })

  if(!result) {
    throw HttpError(404, 'Not Found Recruitment or FAQ');
  }

  return 'success';
};

module.exports = {
  getFaq,
  insertFaq,
  deleteFaq,
};
