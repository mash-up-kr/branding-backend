const Question = require('../models/question');

async function clearQuestion() {
  await Question.destroy({where: {}, force: true});
}

async function updateQuestion(target, headerList) {
  const list = [];

  for (let i = 0; i < headerList.length; i++) {
    const result = await Question.create({
      teams_id: target.teamId,
      number: i+1,
      content: headerList[i],
    });

    list.push(result);
    console.log(result);

  }

  // console.log(list);

  return list;
}

export {
  clearQuestion,
  updateQuestion,
};
