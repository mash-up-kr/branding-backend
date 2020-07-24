
const express = require('express');
const applicantStatusService = require('../../service/applicantStatus');

const router = express.Router();
  
router.route('/')
  .get(async (req, res, next) => {
    const {role: role} = req.decoded;
    try {
      const result = await applicantStatusService.getApplicants(role);
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