const db = require('../../../common/model/sequelize.js');

const findOneResume = async (applicantId) => {
  const query = 'SELECT a.id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time, q.content as question, q.number, n.content as answer ' +
      'FROM teams as t ' +
      'JOIN applicants as a ON t.id = a.teams_id ' +
      'JOIN questions as q ON t.id = q.teams_id ' +
      'JOIN answers as n ON q.id = n.questions_id AND a.id = n.applicants_id ' +
      'WHERE a.id = :applicantId';
  const options = {
    replacements: {applicantId},
    type: db.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);

  return result;
};

module.exports = {
  findOneResume,
};
