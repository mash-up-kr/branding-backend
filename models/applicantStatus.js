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

async function findAllApplicantStatusByStatus(recruitingId, applicationStatus) {
  const query = `SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time
                  FROM teams as t JOIN applicants as a 
                      ON t.id = a.teams_id
                  WHERE t.recruiting_id = :recruitingId
                        AND
                        a.application_status = :applicationStatus`;
  
  const results = await db.sequelize.query(
    query, 
    {
    replacements: {recruitingId: recruitingId, applicationStatus: applicationStatus}, 
    type: db.Sequelize.QueryTypes.SELECT, 
    raw: true
    });
  
  return results;
}
export {
  findAllApplicantStatus, findAllApplicantStatusByStatus
}