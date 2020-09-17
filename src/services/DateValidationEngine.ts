import { lastDayOfMonth } from 'date-fns';
import { IDateValidationEngine } from './IDateValidationEngine';

export class DateValidationEngine implements IDateValidationEngine {
  parseDateStringToNumber(
    yearStr: string,
    monthStr: string,
    dayStr: string
  ): string {
    if (
      isNaN(Number(yearStr)) ||
      isNaN(Number(monthStr)) ||
      isNaN(Number(dayStr))
    ) {
      const yearInvalid = isNaN(Number(yearStr));
      const monthInvalid = isNaN(Number(monthStr));
      const dayInvalid = isNaN(Number(dayStr));
      const numberInvalid =
        (yearInvalid == true ? 1 : 0) +
        (monthInvalid == true ? 1 : 0) +
        (dayInvalid == true ? 1 : 0);

      const errorMessage =
        'The following value(s) are invalid; please enter a number for: ' +
        (yearInvalid == true ? 'year' : '') +
        (yearInvalid == true && numberInvalid > 1 ? ', ' : '') +
        (monthInvalid == true ? 'month' : '') +
        (monthInvalid == true && dayInvalid == true ? ', ' : '') +
        (dayInvalid == true ? 'day' : '') +
        '.';
      return errorMessage;
    }
    return null;
  }

  checkPositiveValues(year: number, month: number, day: number): string {
    if (year < 0 || month < 0 || day < 0) {
      const yearInvalid = year < 0 ? true : false;
      const monthInvalid = month < 0 ? true : false;
      const dayInvalid = day < 0 ? true : false;
      const numberInvalid =
        (yearInvalid == true ? 1 : 0) +
        (monthInvalid == true ? 1 : 0) +
        (dayInvalid == true ? 1 : 0);

      const errorMessage =
        'The following value(s) are invalid; please enter a number greater than 0 for: ' +
        (yearInvalid == true ? 'year' : '') +
        (yearInvalid == true && numberInvalid > 1 ? ', ' : '') +
        (monthInvalid == true ? 'month' : '') +
        (monthInvalid == true && dayInvalid == true ? ', ' : '') +
        (dayInvalid == true ? 'day' : '') +
        '.';
      return errorMessage;
    }
    return null;
  }

  checkValidValues(year: number, month: number, day: number): string {
    if (month == 0 || month > 12) {
      return 'Month is invalid; please enter a number between 1 and 12.';
    }

    if (day == 0 || day > lastDayOfMonth(new Date(year, month - 1)).getDate()) {
      const lastDay = lastDayOfMonth(new Date(year, month - 1)).getDate();

      return `Day is invalid; please enter a number between 1 and ${lastDay}.`;
    }

    return null;
  }
}
