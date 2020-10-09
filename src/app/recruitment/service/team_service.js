const Team = require('../domain/team.js');
const timeCoverter = require('../../../util/time_coverter.js');
const questionService = require('../../applicant/service/question_service');
const applicantService = require('../../applicant/service/applicant_service');
const HttpError = require('http-errors');

const getTeams = async (recruitmentId) => {
  const teams = await Team.findAll({where: {recruitment_id: recruitmentId}});

  const results = [];
  for (let i = 0; i < teams.length; i++) {
    const updateTime = timeCoverter.toTimestamp(teams[i].update_time);
    const result = {
      id: teams[i].id,
      name: teams[i].name,
      update_time: updateTime,
    };
    results.push(result);
  }

  return results;
};

const getTeam = async (recruitmentId, teamId) => {
  const team = await Team.findOne({where: {recruitment_id: recruitmentId, id: teamId}});

  return {
    id: team.id,
    name: team.name,
    recruitment_id: team.recruitment_id,
    resume_link: team.resume_link,
    sheets_link: team.sheets_link,
    contents: team.introduction
  };
};

const insertTeam = async (recruitmentId, team) => {
  const result = await Team.create({
    name: team.name,
    recruitment_id: recruitmentId,
    resume_link: team.resume_link,
    sheets_link: team.sheets_link,
    sheets_row: 0,
    introduction: team.contents
  });

  return {
    id: result.id,
    name: result.name,
    recruitment_id: result.recruitment_id,
    resume_link: result.resume_link,
    sheets_link: result.sheets_link,
    contents: result.introduction
  };
};

const deleteTeam = async (recruitmentId, teamId) => {
  await questionService.clearQuestionList(teamId);
  await applicantService.clearAllApplicantList(teamId);

  const result = await Team.destroy({
    where: {
      id: teamId, recruitment_id: recruitmentId,
    },
  });

  if(!result) {
    throw HttpError(404, 'Not Found Recruitment or Team');
  }

  return 'success';
};

const updateTeam = async (recruitmentId, team, teamId) => {
  const result = await Team.findOne({where: {recruitment_id: recruitmentId, id: teamId}});

  result.changeInfo(team.name, team.resume_link, team.sheets_link, team.contents);

  await result.update({
    name: result.name,
    resume_link: result.resume_link,
    sheets_link: result.sheets_link,
    introduction: result.introduction,
    update_time: Date.now(),
  });

  return {
    id: result.id,
    name: result.name,
    recruitment_id: result.recruitment_id,
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
  updateTeam,
};
