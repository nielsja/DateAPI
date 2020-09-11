import { DateType } from '../contracts';
import {
  isWeekend,
  getDaysInMonth,
  getDay,
  addBusinessDays,
  addDays,
  isBefore,
  isAfter,
  isEqual,
} from 'date-fns';
import * as holidays from '../data/holidays.json';

export abstract class DateEngine {
  static getDateString(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}/${day}/${year}`;
  }

  static getDateType(dateObj: Date): DateType {
    const isFixedHoliday = this.checkIfFixedHoliday(dateObj);
    const isFloatHoliday = this.checkIfFloatingHoliday(dateObj);

    if (isFixedHoliday || isFloatHoliday) {
      return DateType.Holiday;
    }

    if (isWeekend(dateObj)) {
      return DateType.Weekend;
    }

    return DateType.Business;
  }

  /**
   * Gets the Next or Previous calendar date.
   * @param startDate the starting date to calculate from.
   * @param searchDirection describes the direction to find the date.
   * True for next (future) dates, false for previous (past) dates.
   */
  static getAdjacentCalendarDate(
    startDate: Date,
    searchDirection: boolean
  ): Date {
    let offset = searchDirection ? 1 : -1;
    return addDays(startDate, offset);
  }

  /**
   * Gets the Next or Previous business date.
   * @param startDate the starting date to calculate from.
   * @param searchDirection describes the direction to find the date.
   * True for next (future) dates, false for previous (past) dates.
   */
  static getAdjacentBusinessDate(
    startDate: Date,
    searchDirection: boolean
  ): Date {
    let offset = searchDirection ? 1 : -1;
    let nextDate = addBusinessDays(startDate, offset);
    while (this.getDateType(nextDate) == DateType.Holiday) {
      nextDate = addBusinessDays(nextDate, offset);
    }
    return nextDate;
  }

  /**
   * Gets the Next or Previous weekend date.
   * @param startDate the starting date to calculate from.
   * @param searchDirection describes the direction to find the date.
   * True for next (future) dates, false for previous (past) dates.
   */
  static getAdjacentWeekendDate(
    startDate: Date,
    searchDirection: boolean
  ): Date {
    let offset = searchDirection ? 1 : -1;
    let nextDate: Date = addDays(startDate, offset);
    while (!isWeekend(nextDate)) {
      nextDate = addDays(nextDate, offset);
    }

    return nextDate;
  }

  /**
   * Gets the Next or Previous holiday date.
   * @param startDate the starting date to calculate from.
   * @param searchDirection describes the direction to find the date.
   * True for next (future) dates, false for previous (past) dates.
   */
  static getAdjacentHolidayDate(
    startDate: Date,
    searchDirection: boolean
  ): Date {
    const holidayList = this.calculateHolidayDates(startDate.getFullYear());
    //console.log('Holiday List:', holidayList);
    //console.log('Start Date: ', startDate);
    //startDate.setTime(0); // so that the startDate is at midnight like the holidayList dates
    //console.log('Start Date: ', startDate);
    let searchDate;
    let i = 0;
    // change the evaluation to compare months and days instead of the date objects
    //console.log('Holiday list length: ', holidayList.length);
    // console.log('Holiday #0: ', holidayList[i]);
    //console.log('Comparison', holidayList[i] < startDate);
    while (holidayList[i] <= startDate && i < holidayList.length) {
      //console.log('Holiday #' + i + ': ', holidayList[i]);
      i++;
    }
    //console.log(
    //   'Start Date is Before?',
    //   isBefore(startDate, holidayList[i + 1])
    // );
    //console.log('Start Date is After? ', isAfter(startDate, holidayList[i]));
    //console.log('Start Date is Equal? ', isEqual(startDate, holidayList[i]));

    if (searchDirection) {
      if (i == holidayList.length) {
        // if start date is after Christmas, get the first holiday in following year
        const nextYearHolidayList = this.calculateHolidayDates(
          startDate.getFullYear() + 1
        );
        searchDate = nextYearHolidayList[0];
      } else {
        searchDate = holidayList[i];
      }
    } else {
      if (holidayList[i - 1] < startDate) {
        searchDate = holidayList[i - 1];
      } else {
        if (i > 1) {
          searchDate = holidayList[i - 2];
        } else {
          // if start date is Jan 01, get the last holiday in previous year
          const prevYearHolidayList = this.calculateHolidayDates(
            startDate.getFullYear() - 1
          );
          searchDate = prevYearHolidayList[prevYearHolidayList.length - 1];
        }
      }
    }
    // console.log('Search Date: ', searchDate);
    return searchDate;
  }

  //#region getDateType Helper Methods
  static checkIfFixedHoliday(dateObj: Date): boolean {
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

  static checkIfFloatingHoliday(dateObj: Date): boolean {
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
          let holidayDate = this.calculateFloatingDate(
            year,
            holidayMonth,
            holidayWeek,
            holidayDayOfWeek
          );

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
    });

    return isHoliday;
  }

  static calculateFloatingDate(
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
        let date = new Date(year, month, dayOfMonth);

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
        let date = new Date(year, month, dayOfMonth);

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

  static calculateHolidayDates(year: number): Date[] {
    let holidayList: Date[] = [];

    for (const fixed of holidays.Fixed) {
      let fixedDate = new Date(year, fixed.Date.Month, fixed.Date.Day);
      holidayList.push(fixedDate);
    }

    for (const floating of holidays.Floating) {
      let floatDate = this.calculateFloatingDate(
        year,
        floating.Date.Month,
        floating.Date.Week,
        floating.Date.DayOfWeek
      );
      holidayList.push(floatDate);
    }

    holidayList.sort(function (a: Date, b: Date) {
      if (isBefore(a, b)) {
        return -1;
      } else {
        return 1;
      }
    });

    return holidayList;
  }
  //#endregion
}
