const Answer = require('../domain/answer.js');

async function clearAnswerList(questionId, transaction) {
  try {
    await Answer.destroy({
      where: {
        question_id: questionId,
      },
      transaction,
    });
  } catch (err) {
    throw Error('Error while delete answers');
  }
  return true;
}

async function createAnswer(questionId, applicantId, content) {
  try {
    const answer = await Answer.create({
      questions_id: questionId,
      applicants_id: applicantId,
      content: content,
    });
    return answer;
  } catch (err) {
    throw Error('Error while create answer');
  }
}

module.exports = {
  clearAnswerList,
  createAnswer,
};
