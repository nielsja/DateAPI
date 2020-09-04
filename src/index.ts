import * as express from 'express';
import { getDate, getRange, getToday } from './endpoints';

const port: number = Number.parseInt(process.env.PORT ?? '3000');

const app = express();

app.get('/', (request, response) => {
  response.send('Howdy! You reached the app.');
});

app.get('/today', (req, res) => {
  var response = getToday();
  res.send(response);
});

app.get('/date', (req, res) => {
  var response = getDate('date');
  res.send(response);
});

app.get('/range', (req, res) => {
  var response = getRange('startDate', 'endDate');
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
