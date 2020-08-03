const spreadsheet = require('../util/spreadsheet');

const router = require('express').Router()
const applicant = require('./applicant/controller/applicantRouter');
const applicantStatus = require('./applicant/controller/applicantStatusRouter');
const auth = require('../app/user/controller');
const authMiddleware = require('../common/auth/auth');


router.use('/', auth);
router.use('/applicants', authMiddleware);
router.use('/applicants', applicant);
router.use('/applicant-status', authMiddleware);
router.use('/applicant-status', applicantStatus);

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

module.exports = router
