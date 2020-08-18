const spreadsheet = require('../util/spreadsheet.js');

const router = require('express').Router();
const applicantRouter = require('./applicant/api/router/applicant_router.js');
const applicantStatusRouter = require('./applicant/api/router/applicant_status_router.js');
const authRouter = require('./user/api/router/auth_router.js');
const authMiddleware = require('../common/auth/auth.js');

const authMiddlewareUriList = ['/v1/backoffice/applicants', '/v1/backoffice/applicant-status'];

router.use('/v1/backoffice/', authRouter);
router.use(authMiddlewareUriList, authMiddleware);
router.use('/v1/backoffice/applicants', applicantRouter);
router.use('/v1/backoffice/applicant-status', applicantStatusRouter);

module.exports = router
