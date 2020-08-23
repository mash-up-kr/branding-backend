const db = require('../../../common/model/sequelize.js');

const findAllApplicants = async recruitingId => {
  const query = 'SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
    'FROM teams as t ' +
    'JOIN applicants as a ON t.id = a.teams_id ' +
    'WHERE t.recruiting_id = :recruitingId';
  const options = {
    replacements: {recruitingId},
    type: db.Sequelize.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);
  
  return result;
};

const findAllApplicantStatusByValue = async (recruitingId, value) => {
  const query = 'SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
    'FROM teams as t ' +
    'JOIN applicants as a ON t.id = a.teams_id ' +
    'WHERE t.recruiting_id = :recruitingId AND a.name LIKE :value OR a.email LIKE :value ' +
    'GROUP BY a.id';
  const options = {
    replacements: {
      recruitingId,
      value: '%' + value + '%',
    },
    type: db.Sequelize.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);
  
  return result;
};

const findAllApplicantStatusByTeams = async (recruitingId, teamsId) => {
  const query = 'SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
    'FROM teams as t ' +
    'JOIN applicants as a ON t.id = a.teams_id ' +
    'WHERE t.recruiting_id = :recruitingId AND a.teams_id = :teamsId';
  const options = {
    replacements: {recruitingId, teamsId},
    type: db.Sequelize.QueryTypes.SELECT,
    raw: true,
  };
  const result = await db.sequelize.query(query, options);

  return result;
};

const findAllApplicantStatusByStatus = async (recruitingId, applicationStatus) => {
  const query = 'SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time ' +
    'FROM teams as t ' +
    'JOIN applicants as a ON t.id = a.teams_id ' +
    'WHERE t.recruiting_id = :recruitingId AND a.application_status = :applicationStatus';
  const options = {
    replacements: {recruitingId, applicationStatus},
    type: db.Sequelize.QueryTypes.SELECT,
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

