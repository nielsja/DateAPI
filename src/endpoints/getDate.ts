import { DateEngine, IDateEngine } from '../services';
import { IDate, DateType } from '../contracts';
import { lastDayOfMonth } from 'date-fns';

export const getDate = (
  yearStr: string,
  monthStr: string,
  dayStr: string
): IDate => {
  //#region Make sure all values can be parsed to a number
  if (
    isNaN(Number(yearStr)) ||
    isNaN(Number(monthStr)) ||
    isNaN(Number(dayStr))
  ) {
    let yearInvalid = isNaN(Number(yearStr));
    let monthInvalid = isNaN(Number(monthStr));
    let dayInvalid = isNaN(Number(dayStr));
    let numberInvalid =
      (yearInvalid == true ? 1 : 0) +
      (monthInvalid == true ? 1 : 0) +
      (dayInvalid == true ? 1 : 0);

    let errorMessage =
      'The following value(s) are invalid; please enter a number for: ' +
      (yearInvalid == true ? 'year' : '') +
      (yearInvalid == true && numberInvalid > 1 ? ', ' : '') +
      (monthInvalid == true ? 'month' : '') +
      (monthInvalid == true && numberInvalid > 2 ? ', ' : '') +
      (dayInvalid == true ? 'day' : '') +
      '.';
    throw new Error(errorMessage);
  }
  //#endregion

  //#region Make sure all values are positive
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (year < 0 || month < 0 || day < 0) {
    let yearInvalid = year < 0 ? true : false;
    let monthInvalid = month < 0 ? true : false;
    let dayInvalid = day < 0 ? true : false;
    let numberInvalid =
      (yearInvalid == true ? 1 : 0) +
      (monthInvalid == true ? 1 : 0) +
      (dayInvalid == true ? 1 : 0);

    let errorMessage =
      'The following value(s) are invalid; please enter a number greater than 0 for: ' +
      (yearInvalid == true ? 'year' : '') +
      (yearInvalid == true && numberInvalid > 1 ? ', ' : '') +
      (monthInvalid == true ? 'month' : '') +
      (monthInvalid == true && numberInvalid > 2 ? ', ' : '') +
      (dayInvalid == true ? 'day' : '') +
      '.';
    throw new Error(errorMessage);
  }
  //#endregion

  //#region Make sure all values are valid
  if (month > 12) {
    throw new Error(
      'Month is invalid; please enter a number between 1 and 12.'
    );
  }

  if (day > lastDayOfMonth(new Date(year, month - 1)).getDate()) {
    const lastDay = lastDayOfMonth(new Date(year, month - 1)).getDate();

    throw new Error(
      `Day is invalid; please enter a number between 1 and ${lastDay}.`
    );
  }
  //#endregion

  const date = new Date(year, month - 1, day);
  const engine: IDateEngine = new DateEngine();

  return {
    date: engine.getDateString(date),
    type: engine.getDateType(date),
    nextDate: engine.getNextDate(date, true),
    nextBusinessDate: engine.getNextDate(date, true, DateType.Business),
    nextWeekendDate: engine.getNextDate(date, true, DateType.Weekend),
    nextHolidayDate: engine.getNextDate(date, true, DateType.Holiday),
    previousDate: engine.getNextDate(date, false),
    previousBusinessDate: engine.getNextDate(date, false, DateType.Business),
    previousWeekendDate: engine.getNextDate(date, false, DateType.Weekend),
    previousHolidayDate: engine.getNextDate(date, false, DateType.Holiday),
  };
};
