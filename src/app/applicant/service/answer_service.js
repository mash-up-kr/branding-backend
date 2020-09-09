const Answer = require('../domain/answer.js');

async function clearAnswerList(questionId, transaction) {
  try {
    const result = await Answer.destroy({
      where: {
        question_id: questionId,
      },
      transaction,
    });
  } catch (err) {
    console.error(err);
    throw Error('Error while delete answers'); // 500
  }
  return true;
}

async function createAnswer(questionId, applicantId, content) {
  try {
    const answer = await Answer.create({
      question_id: questionId,
      applicant_id: applicantId,
      content: content,
    });
    return answer;
  } catch (err) {
    console.error(err);
    throw Error('Error while create answer'); // 500
  }
}

module.exports = {
  clearAnswerList,
  createAnswer,
};
