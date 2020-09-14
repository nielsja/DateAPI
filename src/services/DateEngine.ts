import { DateType } from '../contracts';
import { IDateEngine } from './IDateEngine';
import {
  isWeekend,
  getDaysInMonth,
  getDay,
  addBusinessDays,
  addDays,
  isBefore,
} from 'date-fns';
import * as holidays from '../data/holidays.json';

export class DateEngine implements IDateEngine {
  getDateString(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}/${day}/${year}`;
  }

  getDateType(dateObj: Date): DateType {
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

  getNextDate(
    dateObj: Date,
    searchDirection: boolean,
    dateType: DateType = null
  ): string {
    switch (dateType) {
      case DateType.Business: {
        const business = this.getAdjacentBusinessDate(dateObj, searchDirection);
        return this.getDateString(business);
      }
      case DateType.Weekend: {
        const weekend = this.getAdjacentWeekendDate(dateObj, searchDirection);
        return this.getDateString(weekend);
      }
      case DateType.Holiday: {
        const holiday = this.getAdjacentHolidayDate(dateObj, searchDirection);
        return this.getDateString(holiday);
      }
      case null: {
        const calendar = this.getAdjacentCalendarDate(dateObj, searchDirection);
        return this.getDateString(calendar);
      }
    }
  }

  //#region Get Adjacent Date Helper Methods
  /**
   * Gets the Next or Previous calendar date.
   * @param startDate the starting date to calculate from.
   * @param searchDirection describes the direction to find the date.
   * True for next (future) dates, false for previous (past) dates.
   */
  getAdjacentCalendarDate(startDate: Date, searchDirection: boolean): Date {
    const offset = searchDirection ? 1 : -1;
    return addDays(startDate, offset);
  }

  /**
   * Gets the Next or Previous business date.
   * @param startDate the starting date to calculate from.
   * @param searchDirection describes the direction to find the date.
   * True for next (future) dates, false for previous (past) dates.
   */
  getAdjacentBusinessDate(startDate: Date, searchDirection: boolean): Date {
    const offset = searchDirection ? 1 : -1;
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
  getAdjacentWeekendDate(startDate: Date, searchDirection: boolean): Date {
    const offset = searchDirection ? 1 : -1;
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
  getAdjacentHolidayDate(startDate: Date, searchDirection: boolean): Date {
    const holidayList = this.calculateHolidayDates(startDate.getFullYear());

    let i = 0;
    while (holidayList[i] <= startDate && i < holidayList.length) {
      i++;
    }

    if (searchDirection) {
      if (i == holidayList.length) {
        // if start date is after Christmas, get the first holiday in following year
        const nextYearHolidayList = this.calculateHolidayDates(
          startDate.getFullYear() + 1
        );
        return nextYearHolidayList[0];
      } else {
        return holidayList[i];
      }
    } else {
      if (holidayList[i - 1] < startDate) {
        return holidayList[i - 1];
      } else {
        if (i > 1) {
          return holidayList[i - 2];
        } else {
          // if start date is Jan 01, get the last holiday in previous year
          const prevYearHolidayList = this.calculateHolidayDates(
            startDate.getFullYear() - 1
          );
          return prevYearHolidayList[prevYearHolidayList.length - 1];
        }
      }
    }
  }
  //#endregion

  //#region Holiday Helper Methods
  checkIfFixedHoliday(dateObj: Date): boolean {
    let isHoliday = false;

    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    holidays.Fixed.forEach((holiday) => {
      const holidayMonth = holiday.Date.Month;
      const holidayDay = holiday.Date.Day;

      if (holidayMonth == month && holidayDay == day) {
        isHoliday = true;
      }
    });

    return isHoliday;
  }

  checkIfFloatingHoliday(dateObj: Date): boolean {
    let isHoliday = false;

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const dayOfWeek = dateObj.getDay();

    holidays.Floating.forEach((holiday) => {
      const holidayMonth = holiday.Date.Month;
      const holidayWeek = holiday.Date.Week;
      const holidayDayOfWeek = holiday.Date.DayOfWeek;

      // Check if month matches
      if (holidayMonth == month) {
        // Check if day of week matches
        if (holidayDayOfWeek == dayOfWeek) {
          // Get holiday date, check if matches
          const holidayDate = this.calculateFloatingDate(
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

  calculateFloatingDate(
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
        const date = new Date(year, month, dayOfMonth);

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
        const date = new Date(year, month, dayOfMonth);

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

  calculateHolidayDates(year: number): Date[] {
    const holidayList: Date[] = [];

    for (const fixed of holidays.Fixed) {
      const fixedDate = new Date(year, fixed.Date.Month, fixed.Date.Day);
      holidayList.push(fixedDate);
    }

    for (const floating of holidays.Floating) {
      const floatDate = this.calculateFloatingDate(
        year,
        floating.Date.Month,
        floating.Date.Week,
        floating.Date.DayOfWeek
      );
      holidayList.push(floatDate);
    }

    holidayList.sort(function (a: Date, b: Date) {
      // if (isBefore(a, b)) {
      //   return -1;
      // } else {
      //   return 1;
      // }
      return isBefore(a, b) ? -1 : 1;
    });

    return holidayList;
  }
  //#endregion
}
