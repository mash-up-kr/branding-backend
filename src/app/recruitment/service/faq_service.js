const FAQ = require('../domain/faq.js');
const RECRUITING = require('../domain/recruiting.js');
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

  const recruiting = await RECRUITING.findOne({
    where: {
      id: recruitmentId
    }
  });

  if(!recruiting) {
    const error = new Error('Not Found Recruitment');
    error.status = 404;
    throw error;
  }

  const result = await FAQ.create({
    recruiting_id: recruitmentId,
    question: faq.question,
    answer: faq.answer,
  });

  return result;
};

const deleteFaq = async (role, recruitmentId, faqId) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const result = await FAQ.destroy({
    where: {
        id: faqId, recruiting_id: recruitmentId
    }
  })
  
  if(!result) {
    const error = new Error('Not Found Recruitment or FAQ');
    error.status = 404;
    throw error;
  }

  return 'success';
};

module.exports = {
  getFaq,
  insertFaq,
  deleteFaq,
};
