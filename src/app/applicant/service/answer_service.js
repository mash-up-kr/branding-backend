const Answer = require('../domain/answer.js');

async function clearAnswerList(questionId, transaction) {
  try {
    const result = await Answer.destroy({
      where: {
        question_id: questionId,
      },
      transaction,
    });
    if (result === 0) {
      throw Error(`Can't find answers`); // 404
    }
  } catch (err) {
    console.error(err);
    throw Error('Error while delete answers'); // 500 || 404
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
    console.error(err);
    throw Error('Error while create answer'); // 500
  }
}

module.exports = {
  clearAnswerList,
  createAnswer,
};
