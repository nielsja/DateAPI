import * as express from 'express';
import * as bodyParser from 'body-parser';
import { getDate, getRange, getToday } from './endpoints';
import { DateEngine } from './services';

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

/* For Postman testing only */
app.use(express.json());

var engine = new DateEngine();

app.get('/engine/test', (req, res) => {
  var response = engine.test();
  res.send(response);
});

app.get('/engine/testBody', (req, res) => {
  var response = engine.testBody(req.body);
  res.send(response);
});

app.get('/engine/testQuery', (req, res) => {
  var response = engine.testQuery(req.query);
  res.send(response);
});

app.get('/engine/getDateType', (req, res) => {
  var year = Number(req.body.year);
  var month = Number(req.body.month);
  var day = Number(req.body.day);
  var date = new Date(year, month, day);

  var response = engine.getDateType(date);
  res.send(response);
});

app.get('/engine/checkIfFixedHoliday', (req, res) => {
  var year = Number(req.body.year);
  var month = Number(req.body.month);
  var day = Number(req.body.day);
  var date = new Date(year, month, day);

  var response = engine.checkIfFixedHoliday(date);
  res.send(response);
});

app.get('/engine/checkIfFloatingHoliday', (req, res) => {
  var year = Number(req.body.year);
  var month = Number(req.body.month);
  var day = Number(req.body.day);
  var date = new Date(year, month, day);

  var response = engine.checkIfFloatingHoliday(date);
  res.send(response);
});

app.get('/engine/calculateFloatingHoliday', (req, res) => {
  var year = Number(req.query.year);
  var month = Number(req.query.month);
  var week = Number(req.query.week);
  var dayOfWeek = Number(req.query.dayOfWeek);

  var response = engine.calculateFloatingHoliday(year, month, week, dayOfWeek);
  res.send(response);
});
