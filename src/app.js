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

app.use('/api', require('./app/'))

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
