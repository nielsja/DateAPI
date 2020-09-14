import * as express from 'express';
import { getDate, getToday } from './endpoints';
import { DateEngine } from './services';

const port: number = Number.parseInt(process.env.PORT ?? '3000');

const app = express();

app.get('/', (request, response) => {
  response.send('Howdy! You reached the app.');
});

app.get('/today', (req, res) => {
  res.send(getToday());
});

app.get('/date', (req, res) => {
  const response = getDate('year', 'month', 'day');
  res.send(response);
});

app.get('/range', (req, res) => {
  res.send('range');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

/* For Postman testing only */
//#region Postman testing
app.use(express.json());

app.get('/engine/getDateType', (req, res) => {
  let year = Number(req.body.year);
  let month = Number(req.body.month);
  let day = Number(req.body.day);
  let date = new Date(year, month, day);

  let response = new DateEngine().getDateType(date);
  res.send(response);
});

app.get('/engine/checkIfFixedHoliday', (req, res) => {
  let year = Number(req.body.year);
  let month = Number(req.body.month);
  let day = Number(req.body.day);
  let date = new Date(year, month, day);

  let response = new DateEngine().checkIfFixedHoliday(date);
  res.send(response);
});

app.get('/engine/checkIfFloatingHoliday', (req, res) => {
  let year = Number(req.body.year);
  let month = Number(req.body.month);
  let day = Number(req.body.day);
  let date = new Date(year, month, day);

  let response = new DateEngine().checkIfFloatingHoliday(date);
  res.send(response);
});

app.get('/engine/calculateFloatingDate', (req, res) => {
  let year = Number(req.query.year);
  let month = Number(req.query.month);
  let week = Number(req.query.week);
  let dayOfWeek = Number(req.query.dayOfWeek);

  let response = new DateEngine().calculateFloatingDate(
    year,
    month,
    week,
    dayOfWeek
  );
  res.send(response);
});
//#endregion
