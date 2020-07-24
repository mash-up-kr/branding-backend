import express from 'express';

import {sequelize} from './models';
import {getHeaderListFromId} from './util/spread_sheet';

import authMiddleware from './middlewares/auth';
import userRoute from './api/routes/user';
import recruitingRoute from './api/routes/recruiting';
import qnaRoute from './api/routes/qna';
import teamRoute from './api/routes/team';
import questionRoute from './api/routes/question';
import applicantRoute from './api/routes/applicant';
import answerRoute from './api/routes/answer';
import authRoute from './api/routes/auth';
import applicantStatusRoute from './api/routes/applicantStatus';

const app = express();

const PORT = 3001;

app.use(express.json());

app.use('/v1/', authRoute);
app.use('/v1/users', userRoute);
app.use('/v1/applicant-status', authMiddleware);
app.use('/v1/applicant-status', applicantStatusRoute);
app.use('/v1/recruiting', authMiddleware);
app.use('/v1/recruiting', recruitingRoute);
app.use('/v1/qna', authMiddleware);
app.use('/v1/qna', qnaRoute);
app.use('/v1/teams', authMiddleware);
app.use('/v1/teams', teamRoute);
app.use('/v1/questions', authMiddleware);
app.use('/v1/questions', questionRoute);
app.use('/v1/applicants', authMiddleware);
app.use('/v1/applicants', applicantRoute);
app.use('/v1/answers', authMiddleware);
app.use('/v1/answers', answerRoute);

app.use((req, res, next) => {
  const error =  new Error('Bad Request');
  error.status = 404;
  next(error);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status).send({status: err.status, message: err.message});
});

app.get('/sheet', async (req, res) => {
  const testSheetId = '122TOSC-YycmW3uhK5MlwdVawSKdjVURHRwDKJZbG0kE';
  res.send(await getHeaderListFromId(testSheetId));
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
