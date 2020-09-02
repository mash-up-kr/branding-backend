const Recruitment = require('../domain/recruitment.js');
const timeCoverter = require('../../../util/time_coverter.js');

const getRecruitment = async () => {
  const latelyRecruiting = await Recruitment.findOne({
    limit: 1,
    order: [[ 'id', 'DESC' ]]
  });

  const recruitmentStart = timeCoverter.toTimestamp(latelyRecruiting.recruitment_start_period);
  const recruitmentEnd = timeCoverter.toTimestamp(latelyRecruiting.recruitment_end_period);
  const documentAcceptanceStart = timeCoverter.toTimestamp(latelyRecruiting.document_acceptance_start_period);
  const documentAcceptanceEnd = timeCoverter.toTimestamp(latelyRecruiting.document_acceptance_end_period);
  const interviewStart = timeCoverter.toTimestamp(latelyRecruiting.interview_start_period);
  const interviewEnd = timeCoverter.toTimestamp(latelyRecruiting.interview_end_period);
  const finalAcceptanceStart = timeCoverter.toTimestamp(latelyRecruiting.final_acceptance_start_period);
  const finalAcceptanceEnd = timeCoverter.toTimestamp(latelyRecruiting.final_acceptance_end_period);

  return {
    id: latelyRecruiting.id,
    banner: latelyRecruiting.main_banner,
    title: latelyRecruiting.title,
    order: latelyRecruiting.order,
    introduction: latelyRecruiting.introduction,
    recruitment_start: recruitmentStart,
    recruitment_end: recruitmentEnd,
    document_acceptance_start: documentAcceptanceStart,
    document_acceptance_end: documentAcceptanceEnd,
    interview_start: interviewStart,
    interview_end: interviewEnd,
    final_acceptance_start: finalAcceptanceStart,
    final_acceptance_end: finalAcceptanceEnd,
  };
};

const updateRecruitment = async (recruitmentId, recruitment) => {
  const latelyRecruiting = await Recruitment.findOne({ where: { id: recruitmentId }});

  let recruitmentStart = timeCoverter.toDate(recruitment.recruitment_start);
  let recruitmentEnd = timeCoverter.toDate(recruitment.recruitment_end);
  let documentAcceptanceStart = timeCoverter.toDate(recruitment.document_acceptance_start);
  let documentAcceptanceEnd = timeCoverter.toDate(recruitment.document_acceptance_end);
  let interviewStart = timeCoverter.toDate(recruitment.interview_start);
  let interviewEnd = timeCoverter.toDate(recruitment.interview_end);
  let finalAcceptanceStart = timeCoverter.toDate(recruitment.final_acceptance_start);
  let finalAcceptanceEnd = timeCoverter.toDate(recruitment.final_acceptance_end);

  latelyRecruiting.changeInfo(recruitment.banner, recruitment.title, 
    recruitment.introduction, recruitment.order, 
    recruitmentStart, recruitmentEnd, 
    documentAcceptanceStart, documentAcceptanceEnd,
    interviewStart, interviewEnd, 
    finalAcceptanceStart, finalAcceptanceEnd);
  
  await latelyRecruiting.update({ main_banner: latelyRecruiting.main_banner, 
    title: latelyRecruiting.title, order: latelyRecruiting.order,
    introduction: latelyRecruiting.introduction, 
    recruitment_start_period: latelyRecruiting.recruitment_start_period,
    recruitment_end_period: latelyRecruiting.recruitment_end_period,
    document_acceptance_start_period: latelyRecruiting.document_acceptance_start_period,
    document_acceptance_end_period: latelyRecruiting.document_acceptance_end_period,
    interview_start_period: latelyRecruiting.interview_start_period,
    interview_end_period: latelyRecruiting.interview_end_period,
    final_acceptance_start_period: latelyRecruiting.final_acceptance_start_period,
    final_acceptance_end_period: latelyRecruiting.final_acceptance_end_period,
    update_time: Date.now() });

  recruitmentStart = timeCoverter.toTimestamp(latelyRecruiting.recruitment_start_period);
  recruitmentEnd = timeCoverter.toTimestamp(latelyRecruiting.recruitment_end_period);
  documentAcceptanceStart = timeCoverter.toTimestamp(latelyRecruiting.document_acceptance_start_period);
  documentAcceptanceEnd = timeCoverter.toTimestamp(latelyRecruiting.document_acceptance_end_period);
  interviewStart = timeCoverter.toTimestamp(latelyRecruiting.interview_start_period);
  interviewEnd = timeCoverter.toTimestamp(latelyRecruiting.interview_end_period);
  finalAcceptanceStart = timeCoverter.toTimestamp(latelyRecruiting.final_acceptance_start_period);
  finalAcceptanceEnd = timeCoverter.toTimestamp(latelyRecruiting.final_acceptance_end_period);

  return {
    id: latelyRecruiting.id,
    banner: latelyRecruiting.main_banner,
    title: latelyRecruiting.title,
    order: latelyRecruiting.order,
    introduction: latelyRecruiting.introduction,
    recruitment_start: recruitmentStart,
    recruitment_end: recruitmentEnd,
    document_acceptance_start: documentAcceptanceStart,
    document_acceptance_end: documentAcceptanceEnd,
    interview_start: interviewStart,
    interview_end: interviewEnd,
    final_acceptance_start: finalAcceptanceStart,
    final_acceptance_end: finalAcceptanceEnd,
  };
};

module.exports = {
  getRecruitment,
  updateRecruitment,
};
