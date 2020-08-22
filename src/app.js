const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(express.json());

app.use(cors());

app.use('/api', require('./app/'));

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
  res.send(await spreadsheet.getHeaderList(testSheetId));
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
