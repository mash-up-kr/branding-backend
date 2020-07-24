
const express = require('express');
const applicantResume = require('../../service/applicantResume');

const router = express.Router();

router.route('/:applicantId/resume')
  .get(async (req, res, next) => {
    const applicantId = req.params.applicantId;
    const {role: role} = req.decoded;
    try {
      const result = await applicantResume.getResume(role, applicantId);
      res.status('200')
      .json({
        success: true,
        message: { applicantStatus : result }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
module.exports = router;