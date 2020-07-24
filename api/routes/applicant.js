
const express = require('express');
const applicantService = require('../../service/applicant');

const router = express.Router();

router.route('/list')
  .patch(async (req, res, next) => {
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
  })


module.exports = router;