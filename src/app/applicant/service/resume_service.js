const resumeRepository = require('../infrastructure/resume_repository.js');
const teamService = require('../../recruitment/service/team_service');
const applicantService = require('../../applicant/service/applicant_service.js');
const questionService = require('../../applicant/service/question_service.js');
const answerService = require('../../applicant/service/answer_service.js');
const googleSheetRepository = require('../infrastructure/google_sheet_repository.js');
const recruitmentService = require('../../recruitment/service/recruitment_service');
const HttpError = require('http-errors');

const SHEET_LINK = 'sheets_link';
const EMAIL_INDEX = 1;
const NAME_INDEX = 2;
const PHONE_INDEX = 3;

async function getResume(applicantId) {
  try {
    const resumeList = await resumeRepository.findOneResume(applicantId);

    if (!resumeList || resumeList.length === 0) {
      throw HttpError(404, `Can't find a resume`); // 404
    }

    const qnaList = [];
    for (let i = 0; i < resumeList.length; i++) {
      qnaList.push({
        number: resumeList[i].number,
        question: resumeList[i].question,
        answer: resumeList[i].answer,
      });
    }

    const result = {
      id: resumeList[0].id,
      team: {
        id: resumeList[0].team_id,
        name: resumeList[0].team_name,
      },
      name: resumeList[0].name,
      email: resumeList[0].email,
      phone: resumeList[0].phone,
      status: resumeList[0].application_status,
      timestamp: Math.floor(resumeList[0].application_time / 1000),
      qna_list: qnaList,
    };
    return result;
  } catch (err) {
    throw HttpError(err.status || 500, err.message || 'Error while find a resume'); // 500 or 404
  }
}

// TODO(sanghee): delete this function
async function updateAllResume() {
  try {
    // Get current recruitment
    const currRecruitment = await recruitmentService.getRecruitment();
    const currRecruitmentId = currRecruitment.id;

    // TODO 최신의 모집공고 아이디 들고와서 팀 조회하기
    const teamList = await teamService.getTeams(currRecruitmentId);
    const teamIdList = teamList.map(team => {
      return team.id;
    });

    for (const teamId of teamIdList) {
      await updateResumeList(teamId, currRecruitmentId);
    }

  } catch (err) {
    throw HttpError(500, 'Error while update all resume');
  }
}

async function updateResumeHeaderList(teamId, recruitmentId) {
  // TODO(sanghee): Need transaction
  try {
    // await questionService.clearQuestionList(teamId);
    // await applicantService.clearAllApplicantList(teamId);

    // TODO 최신의 모집공고 아이디 들고와서 팀 조회하기
    const team = await teamService.getTeam(recruitmentId, teamId);
    const sheetLink = team.sheets_link;
    const sheetId = getSheetId(sheetLink);

    const headerList = await googleSheetRepository.getHeaderList(sheetId);
    await questionService.createQuestionList(teamId, headerList);
  } catch (err) {
    throw HttpError(500, 'Error while update headers');
  }
}

async function updateResumeList(teamId, recruitmentId) {
  // TODO(sanghee): Need transaction
  try {
    const team = await teamService.getTeam(recruitmentId, teamId);
    const sheetLink = team.sheets_link;
    const sheetId = getSheetId(sheetLink);
    const sheetsRow = team.sheets_row;

    const dataList = await googleSheetRepository.getDataList(sheetId);
    const applicantList = parseDataList(teamId, dataList);

    for (let i = sheetsRow; i < applicantList.length; i++) {
      const applicant = applicantList[i];
      const newApplicant = await applicantService.createApplicant(applicant);
      const newApplicantId = newApplicant.getDataValue('id');
      const questionIdList = await questionService.getQuestionIdList(teamId);
      for (let j = 0; j < questionIdList.length; j++) {
        await answerService.createAnswer(questionIdList[j], newApplicantId, dataList[i][j]);
      }
    }
    await teamService.updateSheetsRow(recruitmentId, teamId, applicantList.length);
  } catch (err) {
    throw HttpError(500, 'Error while update headers');
  }
}

function getSheetId(sheetLink) {
  const splits = sheetLink.split('/');
  if (!!splits[5]) {
    const sheetId = splits[5];
    return sheetId;
  } else {
    throw HttpError(404, `Can't find sheet id from sheet link`);
  }
}

function parseDataList(teamId, dataList) {
  const applicantList = [];

  for (let j = 0; j < dataList.length; j++) {
    const obj = {
      team_id: teamId,
      name: dataList[j][NAME_INDEX],
      email: dataList[j][EMAIL_INDEX],
      phone: dataList[j][PHONE_INDEX],
    };
    applicantList.push(obj);
  }

  return applicantList;
}

module.exports = {
  getResume,
  updateAllResume,
  updateResumeHeaderList,
};
