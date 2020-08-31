const FAQ = require('../domain/faq.js');
const Recruiting = require('../domain/recruiting.js');

const getFaq = async (recruitmentId) => {
  const faqList = await FAQ.findAll({ where: { recruiting_id: recruitmentId}});

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
  const recruiting = await Recruiting.findOne({
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

  return {
    id : result.id,
    question : result.question,
    answer : result.answer,
  };
};

const deleteFaq = async (recruitmentId, faqId) => {
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
