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

  async function findAllApplicants(recruitingId) {
    const getTeamListQuery = `SELECT t.id, t.name FROM teams as t`;
    const teamList = await db.sequelize.query(
      getTeamListQuery, {
        type: db.sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    const getApplicantListQuery = `SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time
                                  FROM teams as t JOIN applicants as a 
                                    ON t.id = a.teams_id
                                  WHERE t.recruiting_id = :recruitingId`;
    const applicantList = await db.sequelize.query(
      getApplicantListQuery, {
        replacements: {
          recruitingId: recruitingId
        },
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    const applicantListLength = applicantList.length;

    const parsedApplicantList = applicantList.map(item => ({
      id: item.id,
      team: {
        id: item.teams_id,
        name: item.teams_name,
      },
      name: item.name,
      email: item.email,
      phone: item.phone,
      timestamp: Math.floor(item.application_time / 1000),
      status: item.application_status,
    }));

    const timestamp = Math.floor(Date.now() / 1000);

    const results = {
      team_list: teamList,
      applicant_list_length: applicantListLength,
      applicant_list: parsedApplicantList,
      timestamp: timestamp,
    }

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

async function findAllApplicantStatusByTeams(recruitingId, teamsId) {
  const query = `SELECT a.id, t.id as teams_id, t.name as teams_name, a.name, a.email, a.phone, a.application_status, a.application_time
                  FROM teams as t JOIN applicants as a 
                      ON t.id = a.teams_id
                  WHERE t.recruiting_id = :recruitingId
                        AND
                        a.teams_id = :teamsId`;
  
  const results = await db.sequelize.query(
    query, 
    {
    replacements: {recruitingId: recruitingId, teamsId: teamsId}, 
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
  findAllApplicantStatus,
  findAllApplicants,
  findAllApplicantStatusByTeams,
  findAllApplicantStatusByStatus,
  findAllApplicantStatusByValue,
}
