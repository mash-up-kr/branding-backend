const Recruiting = require('../domain/recruiting.js');

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
  getRecruitment
};
