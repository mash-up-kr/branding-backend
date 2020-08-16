const Team = require('./team');

async function getTeams() {
  const teams = await Team.findAll();
  return teams;
}


export {
  getTeams,
}
