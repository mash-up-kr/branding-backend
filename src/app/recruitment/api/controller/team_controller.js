const teamService = require('../../service/team_service.js');

const getTeams = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const result = await teamService.getTeams(recruitmentId);
    res.status('200')
      .json({
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
    const result = await teamService.getTeam(recruitmentId, teamId);
    res.status('200')
      .json({
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
    const result = await teamService.insertTeam(recruitmentId, team);
    res.status('200')
      .json({
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const teamId = req.params.team_id;
    const result = await teamService.deleteTeam(recruitmentId, teamId);
    res.status('200')
      .json({
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const recruitmentId = req.params.recruitment_id;
    const teamId = req.params.team_id;
    const team = req.body;
    const result = await teamService.updateTeam(recruitmentId, team, teamId);
    res.status('200')
      .json({
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
  insertTeam,
  deleteTeam,
  updateTeam,
};
