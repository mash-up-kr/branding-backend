const resumeRepository = require('../infrastructure/resume_repository');
const teamService = require('../../team/service/team_service');
const applicantService = require('../../applicant/service/applicant_service');
const questionService = require('../../applicant/service/question_service');
const answerService = require('../../applicant/service/answer_service');
const googleSheetRepository = require('../infrastructure/google_sheet_repository');

const SHEET_LINK = 'sheets_link';
const EMAIL_INDEX = 1;
const NAME_INDEX = 2;
const PHONE_INDEX = 3;

async function getResume(applicantId) {
  try {
    const resumeList = await resumeRepository.findOneResume(applicantId);

    if (!resumeList || resumeList.length === 0) {
      throw Error(); // 404
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
        id: resumeList[0].teams_id,
        name: resumeList[0].teams_name,
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
    throw Error('Error while find a resume'); // 500 or 404
  }
}

// TODO(sanghee): delete this function
async function updateAllResume() {
  try {
    const teamIdList = teamService.getAllTeamsId();

    for (const teamId of teamIdList) {
      await updateResumeHeaderList(teamId);
      await updateResumeList(teamId);
    }

  } catch (err) {
    throw Error('Error while update all resume');
  }
}

async function updateResumeHeaderList(teamId) {
  // TODO(sanghee): Need transaction
  try {
    await questionService.clearQuestionList(teamId);

    const team = teamService.getTeam(teamId);
    const sheetLink = team.getDataValue(SHEET_LINK);
    const sheetId = getSheetId(sheetLink);

    const headerList = await googleSheetRepository.getHeaderList(sheetId);
    await questionService.createQuestionList(teamId, headerList);
  } catch (err) {
    throw Error('Error while update headers');
  }
}

async function updateResumeList(teamId) {
  // TODO(sanghee): Need transaction
  try {
    const team = teamService.getTeam(teamId);
    const sheetLink = team.getDataValue(SHEET_LINK);
    const sheetId = getSheetId(sheetLink);

    const dataList = await googleSheetRepository.getDataList(sheetId);
    const applicantList = parseDataList(dataList);

    for (let i = 0; i < applicantList.length; i++) {
      const applicant = applicantList[i];
      const newApplicant = await applicantService.createApplicant(applicant);
      const newApplicantId = newApplicant.getDataValue('id');
      const questionIdList = questionService.getQuestionIdList(teamId);
      for (let j = 0; j < questionIdList.length; j++) {
        await answerService.createAnswer(questionIdList[j], newApplicantId, dataList[i][j]);
      }
    }
  } catch (err) {
    throw Error('Error while update headers');
  }
}

function getSheetId(sheetLink) {
  const splits = sheetLink.split('/');
  if (!!splits[5]) {
    const sheetId = splits[5];
    return sheetId;
  } else {
    throw Error(`Can't find sheet id from sheet link`);
  }
}

function parseDataList(teamId, dataList) {
  const applicantList = [];

  for (let j = 0; j < dataList.length; j++) {
    const obj = {
      teams_id: teamId,
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
};
