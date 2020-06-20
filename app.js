import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('HELLo world');
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
