const db = require('../../../common/model/sequelize.js');

const findAllApplicants = async recruitmentId => {
  const query = 'SELECT a.id, t.id as team_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
      'FROM teams as t ' +
      'JOIN applicants as a ON t.id = a.team_id ' +
      'WHERE t.recruitment_id = :recruitmentId';
  const options = {
    replacements: {recruitmentId},
    type: db.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);

  return result;
};

const findAllApplicantStatusByValue = async (recruitmentId, value) => {
  const query = 'SELECT a.id, t.id as team_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
      'FROM teams as t ' +
      'JOIN applicants as a ON t.id = a.team_id ' +
      'WHERE t.recruitment_id = :recruitmentId AND a.name LIKE :value OR a.email LIKE :value ' +
      'GROUP BY a.id';
  const options = {
    replacements: {
      recruitmentId,
      value: '%' + value + '%',
    },
    type: db.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);

  return result;
};

const findAllApplicantStatusByTeams = async (recruitmentId, teamsId) => {
  const query = 'SELECT a.id, t.id as team_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
      'FROM teams as t ' +
      'JOIN applicants as a ON t.id = a.team_id ' +
      'WHERE t.recruitment_id = :recruitmentId AND a.team_id = :teamsId';
  const options = {
    replacements: {recruitmentId, teamsId},
    type: db.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);

  return result;
};

const findAllApplicantStatusByStatus = async (recruitmentId, applicationStatus) => {
  const query = 'SELECT a.id, t.id as team_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
      'FROM teams as t ' +
      'JOIN applicants as a ON t.id = a.team_id ' +
      'WHERE t.recruitment_id = :recruitmentId AND a.application_status = :applicationStatus';
  const options = {
    replacements: {recruitmentId, applicationStatus},
    type: db.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);

  return result;
};

module.exports = {
  findAllApplicants,
  findAllApplicantStatusByValue,
  findAllApplicantStatusByTeams,
  findAllApplicantStatusByStatus,
};

