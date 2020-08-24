import * as express from 'express';

const port: number = Number.parseInt(process.env.PORT ?? '3000');

const app = express();

app.get('/', (request, response) => {
  response.send('Howdy! You reached the app.');
});

app.get('/today', (req, res) => {
  res.send('today');
});

app.get('/date', (req, res) => {
  res.send('date');
});

app.get('/range', (req, res) => {
  res.send('range');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
