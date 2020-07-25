const ApplicantResume = require('../models/applicantResume');
const ROLE = require("../models/role");

async function getResume(role, applicantId) {
  if(!role == ROLE.ADMIN) {
    const error = new Error('No Atuthentification');
    error.status = 403;
    throw error;
  }

  const resumeTemp = await ApplicantResume.findOneResume(applicantId);
  
  const arr = [];
  for (let i = 0; i < resumeTemp.length; i++) {
    arr.push({ questionNumber : resumeTemp[i].number, 
      question : resumeTemp[i].question, 
      answer : resumeTemp[i].answer})
  }

  const result = {
    resume : {
      id : resumeTemp[0].id,
      teams_name : resumeTemp[0].teams_name,
      name : resumeTemp[0].name,
      email : resumeTemp[0].email,
      phone : resumeTemp[0].phone,
      application_status : resumeTemp[0].application_status,
      application_time : resumeTemp[0].application_time,
      content :arr
    }
  }  

  return result;
}

async function getApplicant(applicantId) {
  const resumeTemp = await ApplicantResume.findOneApplicant(applicantId);

  const arr = [];
  for (let i = 0; i < resumeTemp.length; i++) {
    arr.push({
      number: resumeTemp[i].number,
      question: resumeTemp[i].question,
      answer: resumeTemp[i].answer
    })
  }

  const result = {
    id: resumeTemp[0].id,
    team: {
      id: resumeTemp[0].teams_id,
      name: resumeTemp[0].teams_name,
    },
    name: resumeTemp[0].name,
    email: resumeTemp[0].email,
    phone: resumeTemp[0].phone,
    status: resumeTemp[0].application_status,
    timestamp: Math.floor(resumeTemp[0].application_time / 1000),
    qna_list: arr
  }

  return result;
}

export {
  getResume,
  getApplicant,
}