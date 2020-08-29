const Recruiting = require('../domain/recruiting.js');
const ROLE = require("../../../common/model/role.js");

const getRecruitment = async () => {
  const latelyRecruiting = await Recruiting.findOne({
    limit: 1,
    order: [[ 'id', 'DESC' ]]
  });

  return {
    id: latelyRecruiting.id,
    banner: latelyRecruiting.main_banner,
    title: latelyRecruiting.title,
    introduction: latelyRecruiting.introduction,
    recruitment_start: latelyRecruiting.recruitment_start_period,
    recruitment_end: latelyRecruiting.recruitment_end_period,
    document_acceptance_start: latelyRecruiting.document_acceptance_start_period,
    document_acceptance_end: latelyRecruiting.document_acceptance_end_period,
    interview_start: latelyRecruiting.interview_start_period,
    interview_end: latelyRecruiting.interview_end_period,
    final_acceptance_start: latelyRecruiting.final_acceptance_start_period,
    final_acceptance_end: latelyRecruiting.final_acceptance_end_period
  };
};

const updateRecruitment = async (recruitmentId, recruitment) => {
  const latelyRecruiting = await Recruiting.findOne({ where: { id: recruitmentId }});

  latelyRecruiting.changeInfo(recruitment.mainBanner, recruitment.title, recruitment.introduction,
    recruitment.recruitment_start, recruitment.recruitment_end, 
    recruitment.document_acceptance_start, recruitment.document_acceptance_end,
    recruitment.interview_start, recruitment.interview_end, 
    recruitment.final_acceptance_start, recruitment.final_acceptance_end);
  
  await latelyRecruiting.update({ main_banner: latelyRecruiting.main_banner,
    title: latelyRecruiting.title, introduction: latelyRecruiting.introduction,
    recruitment_start_period: latelyRecruiting.recruitment_start_period,
    recruitment_end_period: latelyRecruiting.recruitment_end_period,
    document_acceptance_start_period: latelyRecruiting.document_acceptance_start_period,
    document_acceptance_end_period: latelyRecruiting.document_acceptance_end_period,
    interview_start_period: latelyRecruiting.interview_start_period,
    interview_end_period: latelyRecruiting.interview_end_period,
    final_acceptance_start_period: latelyRecruiting.final_acceptance_start_period,
    final_acceptance_end_period: latelyRecruiting.final_acceptance_end_period,
    update_time: Date.now() });

  return {
    id: latelyRecruiting.id,
    banner: latelyRecruiting.main_banner,
    title: latelyRecruiting.title,
    introduction: latelyRecruiting.introduction,
    schedule: {
      recruitment_start: latelyRecruiting.recruitment_start_period,
      recruitment_end: latelyRecruiting.recruitment_end_period,
      document_acceptance_start: latelyRecruiting.document_acceptance_start_period,
      document_acceptance_end: latelyRecruiting.document_acceptance_end_period,
      interview_start: latelyRecruiting.interview_start_period,
      interview_end: latelyRecruiting.interview_end_period,
      final_acceptance_start: latelyRecruiting.final_acceptance_start_period,
      final_acceptance_end: latelyRecruiting.final_acceptance_end_period
    }
  };
};

module.exports = {
  getRecruitment,
  updateRecruitment,
};
