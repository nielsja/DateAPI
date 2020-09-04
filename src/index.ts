import * as express from 'express';
import { getDate } from './endpoints';
import { DateEngine } from './services';

const port: number = Number.parseInt(process.env.PORT ?? '3000');

const app = express();

app.get('/', (request, response) => {
  response.send('Howdy! You reached the app.');
});

app.get('/today', (req, res) => {
  res.send('today');
});

app.get('/date', (req, res) => {
  var response = getDate('date');
  res.send(response);
});

app.get('/range', (req, res) => {
  res.send('range');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

/* For Postman testing only */
app.use(express.json());

app.get('/engine/getDateType', (req, res) => {
  var year = Number(req.body.year);
  var month = Number(req.body.month);
  var day = Number(req.body.day);
  var date = new Date(year, month, day);

  var response = DateEngine.getDateType(date);
  res.send(response);
});

app.get('/engine/checkIfFixedHoliday', (req, res) => {
  var year = Number(req.body.year);
  var month = Number(req.body.month);
  var day = Number(req.body.day);
  var date = new Date(year, month, day);

  var response = DateEngine.checkIfFixedHoliday(date);
  res.send(response);
});

app.get('/engine/checkIfFloatingHoliday', (req, res) => {
  var year = Number(req.body.year);
  var month = Number(req.body.month);
  var day = Number(req.body.day);
  var date = new Date(year, month, day);

  var response = DateEngine.checkIfFloatingHoliday(date);
  res.send(response);
});

app.get('/engine/calculateFloatingDate', (req, res) => {
  var year = Number(req.query.year);
  var month = Number(req.query.month);
  var week = Number(req.query.week);
  var dayOfWeek = Number(req.query.dayOfWeek);

  var response = DateEngine.calculateFloatingDate(year, month, week, dayOfWeek);
  res.send(response);
});
