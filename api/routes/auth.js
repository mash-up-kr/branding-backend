import express from 'express';
import { signIn } from '../../service/user'

const router = express.Router();

router.route('/sign-in')
  .post(async (req, res, next) => {
    const { userId, password } = req.body;
    try {
      const result = await signIn(userId, password);
      res.json("sign-in sucess " + result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
module.exports = router;
