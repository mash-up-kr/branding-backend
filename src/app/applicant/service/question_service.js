const Question = require('../domain/question.js');
const answerService = require('../service/answer_service.js');
const db = require('../../../common/model/sequelize.js');

async function clearQuestionList(teamId) {
  const transaction = await db.sequelize.transaction();
  try {
    const questionList = await Question.findAll({
      where: {
        team_id: teamId,
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
    console.error(err);
    throw Error('Error while delete questions'); // 500
  }
}

async function createQuestionList(teamId, headerList) {
  const list = [];

  const transaction = await db.sequelize.transaction();
  try {
    for (let i = 0; i < headerList.length; i++) {
      const result = await Question.create({
        team_id: teamId,
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
    console.error(err);
    throw Error('Error while create questions'); // 500
  }

  return list;
}

async function getQuestionIdList(teamId) {
  try {
    const questionList = await Question.findAll({
      where: {
        team_id: teamId,
      },
    });

    questionList.sort((a, b) => {
      return a.getDataValue('number') - b.getDataValue('number');
    });

    const questionIdList = [];
    for (const question of questionList) {
      questionIdList.push(question.getDataValue('id'));
    }

    if (questionIdList.length === 0) {
      throw Error(`Can't find questions`); // 404
    }

    return questionIdList;
  } catch (err) {
    console.error(err);
    throw Error('Error while get question id list'); // 404 || 500
  }
}

module.exports = {
  clearQuestionList,
  createQuestionList,
  getQuestionIdList,
};
