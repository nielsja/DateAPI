import {
  DateEngine,
  DateValidationEngine,
  IDateValidationEngine,
} from '../services';
import { IDate, DateType } from '../contracts';
import { IDateEngine } from 'services/IDateEngine';
import { eachDayOfInterval } from 'date-fns';

export const getRange = (
  startYearStr: string,
  startMonthStr: string,
  startDayStr: string,
  endYearStr: string,
  endMonthStr: string,
  endDayStr: string
): IDate[] => {
  const dateValidation: IDateValidationEngine = new DateValidationEngine();

  // Make sure all values can be parsed to a number
  const parseStartDateResponse = dateValidation.parseDateStringToNumber(
    startMonthStr,
    startYearStr,
    startDayStr
  );
  if (parseStartDateResponse != null) {
    throw new Error('Start Date Error: ' + parseStartDateResponse);
  }
  const parseEndDateResponse = dateValidation.parseDateStringToNumber(
    endMonthStr,
    endYearStr,
    endDayStr
  );
  if (parseEndDateResponse != null) {
    throw new Error('End Date Error: ' + parseEndDateResponse);
  }

  // Parse the strings to numbers
  const startYear = Number(startYearStr);
  const startMonth = Number(startMonthStr);
  const startDay = Number(startDayStr);
  const endYear = Number(endYearStr);
  const endMonth = Number(endMonthStr);
  const endDay = Number(endDayStr);

  // Make sure all values are positive
  const positiveStartDateResponse = dateValidation.checkPositiveValues(
    startYear,
    startMonth,
    startDay
  );
  if (positiveStartDateResponse != null) {
    throw new Error('Start Date Error: ' + positiveStartDateResponse);
  }
  const positiveEndDateResponse = dateValidation.checkPositiveValues(
    endYear,
    endMonth,
    endDay
  );
  if (positiveEndDateResponse != null) {
    throw new Error('End Date Error: ' + positiveEndDateResponse);
  }

  // Make sure all values are valid
  const startDatesValidResponse = dateValidation.checkValidValues(
    startYear,
    startMonth,
    startDay
  );
  if (startDatesValidResponse != null) {
    throw new Error('Start Date Error: ' + startDatesValidResponse);
  }
  const endDatesValidResponse = dateValidation.checkValidValues(
    endYear,
    endMonth,
    endDay
  );
  if (endDatesValidResponse != null) {
    throw new Error('End Date Error: ' + endDatesValidResponse);
  }

  // Create the dates and call the engine
  const engine: IDateEngine = new DateEngine();
  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  // Check if end date is greater than start date
  if (startDate > endDate) {
    throw new Error('End date is before Start date.');
  }

  const inputDates = eachDayOfInterval({ start: startDate, end: endDate });

  const resultDates = inputDates.map((date) => {
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
  });

  return resultDates;
};
