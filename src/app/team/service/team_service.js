const Team = require('../domain/team.js');

async function getTeams() {
  const teams = await Team.findAll();
  return teams;
}


export {
  getTeams,
}
