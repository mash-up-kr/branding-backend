const Question = require('../domain/question');
const answerService = require('../service/answer_service');
const db = require('../../../common/model/sequelize');

async function clearQuestionList(teamId) {
  const transaction = await db.sequelize.transaction();
  try {
    const questionList = await Question.findAll({
      where: {
        teams_id: teamId,
      },
      transaction,
    });

    for (const question of questionList) {
      const questionId = question.getDataValue('id');
      await answerService.clearAnswerList(questionId, transaction);
      await Question.destroy({
        where: {
          id: questionId,
        },
        transaction,
      });
    }
    await transaction.commit();
    return true;
  } catch (err) {
    await transaction.rollback();
    throw Error('Error while delete questions');
  }
}

async function createQuestionList(teamId, headerList) {
  const list = [];

  const transaction = await db.sequelize.transaction();
  try {
    for (let i = 0; i < headerList.length; i++) {
      const result = await Question.create({
        teams_id: teamId,
        number: i + 1,
        content: headerList[i],
      }, {
        transaction,
      });
      list.push(result);
    }
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw Error('Error while create questions');
  }

  return list;
}

async function getQuestionIdList(teamId) {
  try {
    const questionList = Question.findAll({
      where: {
        teams_id: teamId,
      },
    });

    questionList.sort((a, b) => {
      return a.getDataValue('number') - b.getDataValue('number');
    });

    const questionIdList = [];
    for (const question of questionList) {
      questionIdList.push(question.getDataValue('id'));
    }
    return questionIdList;
  } catch (err) {
    throw Error('Error while get question id list');
  }
}

module.exports = {
  clearQuestionList,
  createQuestionList,
  getQuestionIdList,
};
