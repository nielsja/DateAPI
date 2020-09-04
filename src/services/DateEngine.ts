import {
  parseISO,
  formatISO,
  isWeekend,
  getDaysInMonth,
  getDay,
} from 'date-fns';
import * as holidays from '../data/holidays.json';
import { DateType } from '../contracts';

export class DateEngine {
  test(): string {
    return 'Date Engine test method hit!';
  }

  testBody(body: any): string {
    var bodyString = JSON.stringify(body);
    return `Body Object: ${bodyString}`;
  }

  testQuery(query: any): string {
    let queryString = JSON.stringify(query);
    return `Query Params: ${queryString}`;
  }

  getDateString(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const dateString = `${month}/${day}/${year}`;

    return dateString;
  }

  getDateType(dateObj: Date): DateType {
    let dateType: DateType;

    // Check if date is a holiday
    const isFixedHoliday = this.checkIfFixedHoliday(dateObj);
    const isFloatHoliday = this.checkIfFloatingHoliday(dateObj);

    if (isFixedHoliday || isFloatHoliday) {
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

    const month = dateObj.getMonth();
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

  checkIfFloatingHoliday(dateObj: Date): boolean {
    let isHoliday: boolean = false;

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const dayOfWeek = dateObj.getDay();

    holidays.Floating.forEach((holiday) => {
      let holidayMonth = holiday.Date.Month;
      let holidayWeek = holiday.Date.Week;
      let holidayDayOfWeek = holiday.Date.DayOfWeek;

      // Check if month matches
      if (holidayMonth == month) {
        // Check if day of week matches
        if (holidayDayOfWeek == dayOfWeek) {
          // Get holiday date, check if matches
          let holidayDate = this.calculateFloatingHoliday(
            year,
            holidayMonth,
            holidayWeek,
            holidayDayOfWeek
          );

          if (holidayDate != null) {
            if (
              holidayDate.getFullYear() == year &&
              holidayDate.getMonth() == month &&
              holidayDate.getDate() == day &&
              holidayDate.getDay() == dayOfWeek
            ) {
              isHoliday = true;
            }
          }
        }
      }
    });

    return isHoliday;
  }

  calculateFloatingHoliday(
    year: number,
    month: number,
    week: number,
    dayOfWeek: number
  ): Date {
    let holidayDate: Date;
    const daysInMonth = getDaysInMonth(new Date(year, month));

    // If holiday is the last __ of the month
    if (week == -1) {
      let ordinalCount = 0;
      let dayOfMonth = daysInMonth;
      do {
        var date = new Date(year, month, dayOfMonth);

        if (getDay(date) == dayOfWeek) {
          ordinalCount++;
          holidayDate = date;
        }

        dayOfMonth--;
      } while (dayOfMonth > 0 && ordinalCount == 0);
    }

    // If holiday is the N-th __ of the month
    else {
      let ordinalCount = 0;
      let dayOfMonth = 1;
      do {
        var date = new Date(year, month, dayOfMonth);

        if (getDay(date) == dayOfWeek) {
          ordinalCount++;

          if (ordinalCount == week) {
            holidayDate = date;
          }
        }

        dayOfMonth++;
      } while (dayOfMonth <= daysInMonth && ordinalCount < week);
    }

    return holidayDate;
  }
}
