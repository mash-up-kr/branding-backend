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

module.exports = {
  getTeams,
};
