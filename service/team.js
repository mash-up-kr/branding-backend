const Team = require('../models/team');

async function getTeams() {
  const teams = await Team.findAll();
  return teams;
}


export {
  getTeams,
}
