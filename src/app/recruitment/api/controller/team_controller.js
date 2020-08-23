const teamService = require('../../service/team_service.js');

const getTeams = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const {role: role} = req.decoded;
    const result = await teamService.getTeams(role, recruitmentId);
    res.status('200')
      .json({
        code: 200,
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getTeam = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const teamId = req.params.team_id;
    const {role: role} = req.decoded;
    const result = await teamService.getTeam(role, recruitmentId, teamId);
    res.status('200')
      .json({
        code: 200,
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const insertTeam = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const team = req.body;
    const {role: role} = req.decoded;
    const result = await teamService.insertTeam(role, recruitmentId, team);
    res.status('200')
      .json({
        code: 200,
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getTeams,
  getTeam,
  insertTeam
};
