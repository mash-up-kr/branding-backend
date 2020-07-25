
const express = require('express');
const applicantResume = require('../../service/applicantResume');
const applicantService = require('../../service/applicant');
const applicantStatusService = require('../../service/applicantStatus');
const applicantResumeService = require('../../service/applicantResume');
const teamService = require('../../service/team');
const answerService = require('../../service/answer');
const questionService = require('../../service/question');
const spreadsheetUtil = require('../../util/spreadsheet');

const router = express.Router();

router.route('/')
.get(async (req, res) => {

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
});

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



router.route('/:id')
  .get(async (req, res, next) => {
    try {
      console.log(req.params.id);
      const result = await applicantResumeService.getApplicant(req.params.id);
      res.status('200')
        .json({
          data: result,
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })



//
// router.route('/')
//   .patch(async (req, res, next) => {
//     const {applicants_id, application_status} = req.body;
//     const {role: role} = req.decoded;
//     try {
//       const result = await applicantService.changeStatus(role, applicants_id, application_status);
//       res.status('200')
//       .json({
//         success: true,
//         message: { applicant : result }
//       });
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
//
// router.route('/list')
//   .patch(async (req, res, next) => {
//     const {applicants_ids, application_status} = req.body;
//     const {role: role} = req.decoded;
//     try {
//       const result = await applicantService.changeListStatus(role, applicants_ids, application_status);
//       res.status('200')
//       .json({
//         success: true,
//         message: { applicant : result }
//       });
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
//
// router.route('/:applicantId/resume')
//   .get(async (req, res, next) => {
//     const applicantId = req.params.applicantId;
//     const {role: role} = req.decoded;
//     try {
//       const result = await applicantResume.getResume(role, applicantId);
//       res.status('200')
//       .json({
//         success: true,
//         message: { applicantStatus : result }
//       });
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })

module.exports = router;
