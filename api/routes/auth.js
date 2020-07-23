const express = require('express');
const UserService = require('../../service/user');

const router = express.Router();

router.route('/sign-in')
  .post(async (req, res, next) => {
    const { userId, password } = req.body;
    try {
      const resultToken = await UserService.signIn(userId, password);
      res.status('200')
      .json({
        success: true,
        message: { token : resultToken }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
module.exports = router;
