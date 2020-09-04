import { DateEngine } from '../../src/services';
import { DateType } from '../../src/contracts';
import * as faker from 'faker';
import { lastDayOfMonth } from 'date-fns';

describe('getDateString()', () => {
  it('should return the date in M/d/yyyy format', () => {
    const testDate = faker.date.recent(10, Date.now);
    const year = testDate.getFullYear();
    const month = testDate.getMonth();
    const day = testDate.getDate();

    const expected = `${year}/${month + 1}/${day}`;

    const actual = DateEngine.getDateString(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getDateType()', () => {
  it('should return Business day', () => {
    const testDate = new Date(2020, 0, 3); // Friday, Jan 03 2020

    const expected = DateType.Business;

    const actual = DateEngine.getDateType(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getDateType()', () => {
  it('should return Weekend', () => {
    const testDate = new Date(2020, 7, 23); // Sunday, Aug 23 2020

    const expected = DateType.Weekend;

    const actual = DateEngine.getDateType(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getDateType()', () => {
  it('should return Holiday', () => {
    const testDate = new Date(2020, 11, 25); // Christmas Day

    const expected = DateType.Holiday;

    const actual = DateEngine.getDateType(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('checkIfFixedHoliday()', () => {
  it('should return true', () => {
    const testDate = new Date(2020, 11, 25); // Christmas Day

    const expected = true;

    const actual = DateEngine.checkIfFixedHoliday(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('checkIfFixedHoliday()', () => {
  it('should return false', () => {
    const testDate = new Date(2020, 11, 24); // Christmas Eve

    const expected = false;

    const actual = DateEngine.checkIfFixedHoliday(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('checkIfFloatingHoliday()', () => {
  it('should return true', () => {
    const testDate = new Date(2020, 8, 7); // Labor Day 2020

    const expected = true;

    const actual = DateEngine.checkIfFloatingHoliday(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('checkIfFloatingHoliday()', () => {
  it('should return false', () => {
    const testDate = new Date(2020, 8, 8); // Not Labor Day 2020

    const expected = false;

    const actual = DateEngine.checkIfFloatingHoliday(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('calculateFloatingDate()', () => {
  it('should return the date of the floating date pattern', () => {
    const year = 2020;
    const month = 1; // February
    const dayOfWeek = 5; // Friday
    const week = -1; // Last occurrence

    const expected = new Date(2020, 1, 28); // Last Saturday of February 2020 = 2/28

    const actual = DateEngine.calculateFloatingDate(
      year,
      month,
      week,
      dayOfWeek
    );

    expect(actual).toStrictEqual(expected);
  });
});

describe('calculateFloatingDate()', () => {
  it('should return the date of the floating date pattern', () => {
    const year = 2020;
    const month = 7; // August
    const dayOfWeek = 4; // Thursday
    const week = 3; // 3rd occurrence

    const expected = new Date(2020, 7, 20); // 3rd Thursday of August 2020 = 8/20

    const actual = DateEngine.calculateFloatingDate(
      year,
      month,
      week,
      dayOfWeek
    );

    expect(actual).toStrictEqual(expected);
  });
});

describe('calculateFloatingDate()', () => {
  it('should not return a date', () => {
    const year = 2020;
    const month = 10; // November
    const dayOfWeek = 4; // Thursday
    const week = 6; // 6th Thursday

    const expected = undefined; // 6th Thursday of November does not exist

    const actual = DateEngine.calculateFloatingDate(
      year,
      month,
      week,
      dayOfWeek
    );

    expect(actual).toStrictEqual(expected);
  });
});

describe('getAdjacentDate()', () => {
  it('should return the first of the following month', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number(0, 10);
    const day = lastDayOfMonth(new Date(year, month)).getDate();
    const testDate = new Date(year, month, day);

    const expected = `new Date(year, month + 1, 1)`;

    const actual = DateEngine.getAdjacentDate(testDate, 1);

    expect(actual).toStrictEqual(expected);
  });
});
