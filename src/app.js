const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  next();
});

app.use('/api', require('./app/'));

app.use((req, res, next) => {
  const error =  new Error('Bad Request');
  error.status = 404;
  next(error);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status).send({code: err.status, data: err.message});
});

app.get('/sheet', async (req, res) => {
  const testSheetId = '122TOSC-YycmW3uhK5MlwdVawSKdjVURHRwDKJZbG0kE';
  res.send(await spreadsheet.getHeaderList(testSheetId));
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
