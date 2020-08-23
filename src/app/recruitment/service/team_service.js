const Team = require('../domain/team.js');
const ROLE = require('../../../common/model/role.js');

const getTeams = async (role, recruitmentId) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const teams = await Team.findAll({ where: { recruiting_id: recruitmentId}});

  const results = [];
  for(let i = 0; i < teams.length; i++) {
    const result = {
      id : teams[i].id,
      name : teams[i].name,
      update_time : teams[i].update_time
    }
    results.push(result);
  }

  return results;
}

const getTeam = async (role, recruitmentId, teamId) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const team = await Team.findOne({ where: { recruiting_id: recruitmentId, id: teamId }});

  return  {
    id: team.id,
    name: team.name,
    recruiting_id: team.recruiting_id,
    resume_link: team.resume_link,
    sheets_link: team.sheets_link,
    contents: team.introduction 
  };
}

const insertTeam = async (role, recruitmentId, team) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const result = await Team.create({
    name: team.name,
    recruiting_id: recruitmentId,
    resume_link: team.resume_link,
    sheets_link: team.sheets_link,
    introduction: team.contents
  });

  return  {
    id: result.id,
    name: result.name,
    recruiting_id: result.recruiting_id,
    resume_link: result.resume_link,
    sheets_link: result.sheets_link,
    contents: result.introduction 
  };
};

const deleteTeam = async (role, recruitmentId, teamId) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const result = await Team.destroy({
    where: {
        id: teamId, recruiting_id: recruitmentId
    }
  });

  if(result >= 1) {
    return 'success';
  } else {
    return 'fail';
  }
};

const updateTeam = async (role, recruitmentId, team, teamId) => {
  if(role != ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const result = await Team.findOne({ where: { recruiting_id: recruitmentId, id: teamId }});

  result.changeInfo(team.name, team.resume_link, team.sheets_link, team.contents);

  await result.update({ name: result.name,
    resume_link: result.resume_link,
    sheets_link: result.sheets_link,
    introduction: result.introduction,
    update_time: Date.now() });

  return  {
    id: result.id,
    name: result.name,
    recruiting_id: result.recruiting_id,
    resume_link: result.resume_link,
    sheets_link: result.sheets_link,
    contents: result.introduction 
  };
};

module.exports = {
  getTeams,
  getTeam,
  insertTeam,
  deleteTeam,
  updateTeam
};
