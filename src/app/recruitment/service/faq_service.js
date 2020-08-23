const FAQ = require('../domain/faq.js');
const ROLE = require('../../../common/model/role.js');

const getFaq = async (role, recruitmentId) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const faqList = await FAQ.findAll({ where: { recruiting_id: recruitmentId}});

  const results = [];
  for(let i = 0; i < faqList.length; i++) {
    const result = {
      id : faqList[i].id,
      question : faqList[i].question,
      answer : faqList[i].answer
    }
    results.push(result);
  }

  return results;
};

const insertFaq = async (role, recruitmentId, faq) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const result = await FAQ.create({
    recruiting_id: recruitmentId,
    question: faq.question,
    answer: faq.answer,
  });

  return result;
};

module.exports = {
  getFaq,
  insertFaq
};
