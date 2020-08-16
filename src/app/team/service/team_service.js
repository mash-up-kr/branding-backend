const Team = require('../domain/team.js');

const getTeams = async () => {
  const result = await Team.findAll();

  return result;
}

module.exports = {
  getTeams,
};
