const spreadsheet = require('../util/spreadsheet.js');

const router = require('express').Router();
const applicantRouter = require('./applicant/api/router/applicant_router.js');
const applicantStatusRouter = require('./applicant/api/router/applicant_status_router.js');
const authRouter = require('./user/api/router/auth_router.js');
const authMiddleware = require('../common/auth/auth.js');


router.use('/', authRouter);
router.use('/applicants', authMiddleware);
router.use('/applicants', applicantRouter);
router.use('/applicant-status', authMiddleware);
router.use('/applicant-status', applicantStatusRouter);

router.use((req, res, next) => {
  const error =  new Error('Bad Request');
  error.status = 404;
  next(error);
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status).send({status: err.status, message: err.message});
});

router.get('/sheet', async (req, res) => {
  const testSheetId = '122TOSC-YycmW3uhK5MlwdVawSKdjVURHRwDKJZbG0kE';
  res.send(await spreadsheet.getHeaderList(testSheetId));
});

module.exports = router;
