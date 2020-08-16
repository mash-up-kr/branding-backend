const Question = require('../domain/question.js');

const clearQuestion = async () => {
  const result = await Question.destroy({where: {}, force: true});

  return result;
};

const updateQuestion = async (target, headerList) => {
  const list = [];

  for (let i = 0; i < headerList.length; i++) {
    const result = await Question.create({
      teams_id: target.teamId,
      number: i+1,
      content: headerList[i],
    });

    list.push(result);
  }

  return list;
};

module.exports = {
  clearQuestion,
  updateQuestion,
};
