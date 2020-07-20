import express from 'express';
import {sequelize} from './models';
import {getHeaderListFromId} from './util/spread_sheet';

const app = express();
const PORT = 3000;

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

sequelize.sync();

