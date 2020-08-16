const Answer = require('../domain/answer');

async function clearAnswers() {
  await Answer.destroy({where: {}});
}

async function updateAnswer(qId, applicantId, content) {
  await Answer.create({
    questions_id: qId,
    applicants_id: applicantId,
    content: content
  })

}

export {
  clearAnswers,
  updateAnswer,
};
