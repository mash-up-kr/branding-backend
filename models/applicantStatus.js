const db = require('./index');

async function findAllApplicantStatus(recruitingId) {
  const query = `SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time
                  FROM teams as t JOIN applicants as a 
                      ON t.id = a.teams_id
                  WHERE t.recruiting_id = :recruitingId`;
  
  const results = await db.sequelize.query(
    query, 
    {
    replacements: {recruitingId: recruitingId}, 
    type: db.Sequelize.QueryTypes.SELECT, 
    raw: true
    });
  
  return results;
}
async function findAllApplicantStatusByValue(recruitingId, value) {
  const query = `SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time
                  FROM teams as t JOIN applicants as a 
                      ON t.id = a.teams_id
                  WHERE t.recruiting_id = :recruitingId
                      AND a.name LIKE :value OR a.email LIKE :value
                  GROUP BY a.id`;
  
  const results = await db.sequelize.query(
    query, 
    {
    replacements: {recruitingId: recruitingId, value: '%' + value + '%'}, 
    type: db.Sequelize.QueryTypes.SELECT, 
    raw: true
    });
  
  return results;
}

export {
  findAllApplicantStatus,
  findAllApplicantStatusByValue
}