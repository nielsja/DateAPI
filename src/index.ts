import * as express from 'express';
import { getDate, getRange, getToday } from './endpoints';
import { DateEngine } from './services';

const port: number = Number.parseInt(process.env.PORT ?? '3000');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Howdy! You reached the app.');
});

app.get('/today', (req, res) => {
  try {
    res.send(getToday());
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).send({ error: error.message });
  }
});

app.get('/date', (req, res) => {
  try {
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    res.send(getDate(year, month, day));
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).send({ error: error.message });
  }
});

app.get('/range', (req, res) => {
  try {
    const startYear = req.body.startYear;
    const startMonth = req.body.startMonth;
    const startDay = req.body.startDay;
    const endYear = req.body.endYear;
    const endMonth = req.body.endMonth;
    const endDay = req.body.endDay;
    res.send(
      getRange(startYear, startMonth, startDay, endYear, endMonth, endDay)
    );
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

/* For Postman testing only */
//#region Postman testing
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
