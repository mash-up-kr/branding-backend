const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

const appRouter = require('./app/index');

app.use(express.json());
app.use(cors());
app.use('/api', appRouter);

app.use((req, res, next) => {
  const error =  new Error('Bad Request');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status).send({status: err.status, message: err.message});
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
