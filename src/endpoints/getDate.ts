import {
  DateEngine,
  IDateEngine,
  DateValidationEngine,
  IDateValidationEngine,
} from '../services';
import { IDate, DateType } from '../contracts';

export const getDate = (
  yearStr: string,
  monthStr: string,
  dayStr: string
): IDate => {
  const dateValidation: IDateValidationEngine = new DateValidationEngine();

  // Make sure all values can be parsed to a number
  const parseNumberResponse = dateValidation.parseDateStringToNumber(
    yearStr,
    monthStr,
    dayStr
  );
  if (parseNumberResponse != null) {
    throw new Error(parseNumberResponse);
  }

  // Parse the strings to numbers
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  // Make sure all values are positive
  const positiveResponse = dateValidation.checkPositiveValues(year, month, day);
  if (positiveResponse != null) {
    throw new Error(positiveResponse);
  }

  // Make sure all values are valid
  const datesValidResponse = dateValidation.checkValidValues(year, month, day);
  if (datesValidResponse != null) {
    throw new Error(datesValidResponse);
  }

  // Create the date and call the engine
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
