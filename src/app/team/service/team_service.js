const Team = require('../domain/team.js');

async function getTeam(teamId) {
  try {
    const team = await Team.findOne({
      where: {
        id: teamId,
      },
    });
    if (!team) {
      throw Error('');
    }
    return team;
  } catch (err) {
    throw Error(`While find a team by id`);
  }
}

// Todo(sanghee): Delete
async function getAllTeamsId() {
  try {
    const teamList = await Team.findAll();

    const teamIdList = [];
    for (const team of teamList) {
      teamIdList.push(team.getDataValue('id'));
    }

    return teamIdList;
  } catch (err) {
    throw Error(`While find all teams id`);
  }
}

module.exports = {
  getTeam,
  getAllTeamsId,
};
