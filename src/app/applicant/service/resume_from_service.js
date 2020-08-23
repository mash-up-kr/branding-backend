const answerService = require('./answer_service.js');
const questionService = require('./question_service.js');
const teamService = require('../../recruitment/service/team_service');
const googleSheet = require('../infrastructure/google_sheet.js');
const db = require('../../../common/model/sequelize.js');
const applicantService = require('./applicant_service.js');

const REGS = '/'
const SHEETS_LINK = 'sheets_link';
const ID = 'id';
const SHEET_INDEX = 5;
const NAME_INDEX = 2;
const EMAIL_INDEX = 1;
const PHONE_INDEX = 3;

const refreshFrom = async (role) => {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }
  
  const t = await db.sequelize.transaction();
  try {
    await clearApplicants();

    const teams = await teamService.getTeams(1);
    const targetList = await parsingToTarget(teams);
        
    await generateApplicants(targetList);
    
    await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
  }
    // for (let j = 0; j < dataList.length; j++) {
    //   const qId = updateQuestionResult[j].getDataValue('id');
    //   console.log(qId);
    // }
    // await applicantService.updateApplicant(applicantTargetList);
    // Update answer
    // await
  // console.log(targetList);
}

const parsingToTarget = async (teams) => {
  const targetList = [];

  for (const team of teams) {
    const sheetLink = team.getDataValue(SHEETS_LINK);
    const splits = sheetLink.split(REGS);
    if (!!splits[SHEET_INDEX]) {
      targetList.push({
        teamId: team.getDataValue(ID),
        spreadId: splits[SHEET_INDEX]
      });
    }
  }
  return targetList;
}

const clearApplicants = async () => {
  await answerService.clearAnswers();
  await questionService.clearQuestion();
  await applicantService.clearApplicants();
}

const generateApplicants = async (targetList) => {
  for (const target of targetList) {
    // Update questions
    const headerList = await googleSheet.getHeaderList(target.spreadId);
    const updateQuestionResult = await questionService.createQuestion(target, headerList);
    // console.log(updateQuestionResult);
  
    // Update applicant
    const dataList = await googleSheet.getDataList(target.spreadId);
    const applicantTargetList = parsingToApplicantTarget(dataList);

    // console.log(applicantTargetList);
    generateAnswer(applicantTargetList, updateQuestionResult, dataList)
  }
}


const parsingToApplicantTarget = async (dataList) => {
  const applicantTargetList = [];

  for (let j = 0; j < dataList.length; j++) {
    const obj = {
      teams_id: target.teamId,
      name: dataList[j][NAME_INDEX],
      email: dataList[j][EMAIL_INDEX],
      phone: dataList[j][PHONE_INDEX],
    };
    applicantTargetList.push(obj);
  }
  return applicantTargetList;
}

const generateAnswer = async (applicantTargetList, updateQuestionResult, dataList) => {
  for (let k = 0; k < applicantTargetList.length; k++) {
    const applicantUpdateResult = await applicantService.createApplicant(applicantTargetList[k]);
    const applicantId = applicantUpdateResult.getDataValue(ID);
    for (let z = 0; z < updateQuestionResult.length; z++) {
      const qId = updateQuestionResult[z].getDataValue(ID);
        // console.log(qId);
        // console.log(applicantId);
      await answerService.createAnswer(qId, applicantId, dataList[k][z]);
    }
  }
}

module.exports = {
  refreshFrom,
};
