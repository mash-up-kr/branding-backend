import express from 'express';

import {sequelize} from './models';
import {getHeaderListFromId} from './util/spread_sheet';

import userRoute from './api/routes/user';
import recruitingRoute from './api/routes/recruiting';
import qnaRoute from './api/routes/qna';
import teamRoute from './api/routes/team';
import questionRoute from './api/routes/question';
import applicantRoute from './api/routes/applicant';

const app = express();

const PORT = 3000;

app.use('/users', userRoute);
app.use('/recruiting', recruitingRoute);
app.use('/qna', qnaRoute);
app.use('/teams', teamRoute);
app.use('/questions', questionRoute);
app.use('/applicants', applicantRoute);

app.get('/', (req, res) => {
  res.send('HELLo world');
});

app.get('/sheet', async (req, res) => {
  const testSheetId = '122TOSC-YycmW3uhK5MlwdVawSKdjVURHRwDKJZbG0kE';
  res.send(await getHeaderListFromId(testSheetId));
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
