import { DateEngine } from '../../src/services';
import { DateType } from '../../src/contracts';
import { lastDayOfMonth, isWeekend, addDays, isValid } from 'date-fns';
import * as faker from 'faker';

const engine = new DateEngine();

//#region Faker Generated Tests
describe('getAdjacentCalendarDate()', () => {
  it('should return the next calendar date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);
    const expected = addDays(startDate, 1);
    const actual = engine.getAdjacentCalendarDate(startDate, true);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });

  it('should return the previous calendar date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);
    const expected = addDays(startDate, -1);
    const actual = engine.getAdjacentCalendarDate(startDate, false);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });
});

describe('getAdjacentBusinessDate()', () => {
  it('should return the following business date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);

    let expected = addDays(startDate, 1);
    while (engine.getDateType(expected) != DateType.Business) {
      expected = addDays(expected, 1);
    }

    const actual = engine.getAdjacentBusinessDate(startDate, true);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });

  it('should return the previous business date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);

    let expected = addDays(startDate, -1);
    while (engine.getDateType(expected) != DateType.Business) {
      expected = addDays(expected, -1);
    }

    const actual = engine.getAdjacentBusinessDate(startDate, false);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });
});

describe('getAdjacentWeekendDate()', () => {
  it('should return the following weekend date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);

    let expected = addDays(startDate, 1);
    while (!isWeekend(expected)) {
      expected = addDays(expected, 1);
    }

    const actual = engine.getAdjacentWeekendDate(startDate, true);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });

  it('should return the previous weekend date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);

    let expected = addDays(startDate, -1);
    while (!isWeekend(expected)) {
      expected = addDays(expected, -1);
    }

    const actual = engine.getAdjacentWeekendDate(startDate, false);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });
});

describe('getAdjacentHolidayDate()', () => {
  it('should return the following holiday date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);
    let expected = addDays(startDate, 1);
    while (engine.getDateType(expected) != DateType.Holiday) {
      expected = addDays(expected, 1);
    }

    const actual = engine.getAdjacentHolidayDate(startDate, true);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });

  it('should return the previous holiday date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);
    let expected = addDays(startDate, -1);
    while (engine.getDateType(expected) != DateType.Holiday) {
      expected = addDays(expected, -1);
    }

    const actual = engine.getAdjacentHolidayDate(startDate, false);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });
});
//#endregion
