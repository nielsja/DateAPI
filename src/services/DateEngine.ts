import { parseISO, formatISO, isWeekend, getDaysInMonth } from 'date-fns';
import * as holidays from '../data/holidays.json';
import { DateType } from '../contracts';

export class DateEngine {
  getDateString(dateObj: Date) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const dateString = `${month}/${day}/${year}`;

    return dateString;
  }

  getDateType(dateObj: Date): DateType {
    let dateType: DateType;

    // Check if date is a holiday
    const isHoliday = this.checkIfFixedHoliday(dateObj);

    if (isHoliday) {
      dateType = DateType.Holiday;
    } else {
      // Check if date is a weekend
      if (isWeekend(dateObj)) {
        dateType = DateType.Weekend;
      }

      // Otherwise, date is a business day
      else {
        dateType = DateType.Business;
      }
    }

    return dateType;
  }

  checkIfFixedHoliday(dateObj: Date): boolean {
    let isHoliday: boolean = false;

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    holidays.Fixed.forEach((holiday) => {
      let holidayMonth = holiday.Date.Month;
      let holidayDay = holiday.Date.Day;

      if (holidayMonth == month && holidayDay == day) {
        isHoliday = true;
      }
    });

    return isHoliday;
  }
}
