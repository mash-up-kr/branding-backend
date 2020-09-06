const router = require('express').Router();
const applicantRouter = require('./applicant/api/router/applicant_router.js');
const authRouter = require('./user/api/router/auth_router.js');
const authMiddleware = require('../common/auth/auth.js');
const emailRouter = require('../app/email/api/router/email_router.js');
const recruitmentRouter = require('../app/recruitment/api/router/recruitment_router.js');

const authMiddlewareUriList = ['/v1/backoffice/applicants', '/v1/backoffice/applicant-status', 
                              '/v1/backoffice/email', '/v1/backoffice/recruitment'];


router.use('/v1/backoffice/', authRouter);
router.use(authMiddlewareUriList, authMiddleware);
router.use('/v1/backoffice/applicants', applicantRouter); // Done
router.use('/v1/backoffice/email', emailRouter);
router.use('/v1/backoffice/recruitment', recruitmentRouter);

module.exports = router;
