const Answer = require('../domain/answer.js');

const clearAnswers = async () => {
  const result = await Answer.destroy({where: {}});

  return result;
};

const createAnswer = async (qId, applicantId, content) => {
  const result = await Answer.create({
    questions_id: qId,
    applicants_id: applicantId,
    content: content
  });

  return result;
};

module.exports = {
  clearAnswers,
  createAnswer,
};
