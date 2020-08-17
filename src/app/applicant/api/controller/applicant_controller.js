const answerService = require('../../service/answer_service.js');
const applicantService = require('../../service/applicant_service.js');
const applicantStatusService = require('../../service/applicant_status_service.js');
const questionService = require('../../service/question_service.js');
const resumeService = require('../../service/resume_service.js');
const teamService = require('../../team/team_service.js');
const spreadsheetUtil = require('../../../../util/spreadsheet.js');

const getResume = async (req, res, next) => {
  try {
    const applicantId = req.params.id;
    const {role: role} = req.decoded;
    const result = await resumeService.getResume(role, applicantId);
    res.status('200')
      .json({
        data: result,
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getApplicantFromSheet = async (req, res) => {

  console.log('asdfsdf');
  const teams = await teamService.getTeams();


  const targetList = [];
  for (const team of teams) {
    const sheetLink = team.getDataValue('sheets_link');
    const splits = sheetLink.split('/');
    if (!!splits[5]) {
      targetList.push({
        teamId: team.getDataValue('id'),
        spreadId: splits[5]
      });
    }
  }

  await answerService.clearAnswers();
  await questionService.clearQuestion();
  await applicantService.clearApplicants();



  for (const target of targetList) {
    // Update questions
    const headerList = await spreadsheetUtil.getHeaderList(target.spreadId);
    const updateQuestionResult = await questionService.updateQuestion(target, headerList);
    // console.log(updateQuestionResult);


    // Update applicant
    const applicantTargetList = [];
    const dataList = await spreadsheetUtil.getDataList(target.spreadId);

    for (let j = 0; j < dataList.length; j++) {
      const obj = {
        teams_id: target.teamId,
        name: dataList[j][2],
        email: dataList[j][1],
        phone: dataList[j][3],
      };
      applicantTargetList.push(obj);
    }
    // console.log(applicantTargetList);

    for (let k = 0; k < applicantTargetList.length; k++) {
      const applicantUpdateResult = await applicantService.updateApplicant(applicantTargetList[k]);
      const applicantId = applicantUpdateResult.getDataValue('id');
      for (let z = 0; z < updateQuestionResult.length; z++) {
        const qId = updateQuestionResult[z].getDataValue('id');

        // console.log(qId);
        // console.log(applicantId);

        await answerService.updateAnswer(qId, applicantId, dataList[k][z]);

      }
    }

    // res.status(200).send({});
    const result222 = await applicantStatusService.getApplicants('ADMIN');
    res.status('200')
    .json({
      data: result222,
    });

    // for (let j = 0; j < dataList.length; j++) {
    //   const qId = updateQuestionResult[j].getDataValue('id');
    //   console.log(qId);
    // }



    // await applicantService.updateApplicant(applicantTargetList);



    // Update answer

    // await


  }


  // console.log(targetList);
};

// router.route('/')
//   .get(async (req, res, next) => {
//     try {
//       const result = await applicantStatusService.getApplicants('ADMIN');
//       res.status('200')
//         .json({
//           data: result,
//         });
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   });
//

const changeStatus = async (req, res, next) => {
  const applicantId = req.params.id;
  const {application_status} = req.body;
  const {role: role} = req.decoded;
  try {
    const result = await applicantService.changeStatus(role, applicantId, application_status);
    res.status('200')
    .json({
      success: true,
      message: { applicant : result }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const changeListStatus = async (req, res, next) => {
  const {applicants_ids, application_status} = req.body;
  const {role: role} = req.decoded;
  try {
    const result = await applicantService.changeListStatus(role, applicants_ids, application_status);
    res.status('200')
    .json({
      success: true,
      message: { applicant : result }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getResume,
  getApplicantFromSheet,
  changeStatus,
  changeListStatus,
};
