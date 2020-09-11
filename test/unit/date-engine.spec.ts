import { DateEngine } from '../../src/services';
import { DateType } from '../../src/contracts';
import * as faker from 'faker';
import {
  lastDayOfMonth,
  isWeekend,
  addDays,
  isSaturday,
  isSunday,
  isValid,
} from 'date-fns';
//#region TESTS CONFIRMED TO PASS
describe('getDateString()', () => {
  it('should return the date in M/d/yyyy format', () => {
    const testDate = new Date();
    const year = testDate.getFullYear();
    const month = testDate.getMonth();
    const day = testDate.getDate();

    const expected = `${month + 1}/${day}/${year}`;
    const actual = DateEngine.getDateString(testDate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getDateType()', () => {
  it('should return Business day', () => {
    const testDate = new Date(2020, 7, 20); // Thursday, Aug 20 2020
    const expected = DateType.Business;
    const actual = DateEngine.getDateType(testDate);
    expect(actual).toStrictEqual(expected);
  });

  it('should return Weekend', () => {
    const testDate = new Date(2020, 7, 23); // Sunday, Aug 23 2020
    const expected = DateType.Weekend;
    const actual = DateEngine.getDateType(testDate);
    expect(actual).toStrictEqual(expected);
  });

  it('should return Holiday', () => {
    const testDate = new Date(2020, 11, 25); // Christmas Day
    const expected = DateType.Holiday;
    const actual = DateEngine.getDateType(testDate);
    expect(actual).toStrictEqual(expected);
  });
});

describe('getAdjacentCalendarDate()', () => {
  describe('find next calendar date', () => {
    it('should return the next calendar date', () => {
      const testDate = new Date(2020, 7, 21); // Friday Aug 21 2020
      const expected = new Date(2020, 7, 22); // Saturday Aug 22 2020
      const actual = DateEngine.getAdjacentCalendarDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the first day of the following year', () => {
      const testDate = new Date(2020, 11, 31);
      const expected = new Date(2021, 0, 1);
      const actual = DateEngine.getAdjacentCalendarDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous calendar date', () => {
    it('should return the previous calendar date', () => {
      const testDate = new Date(2020, 7, 21); // Friday Aug 21 2020
      const expected = new Date(2020, 7, 20); // Thursday Aug 20 2020
      const actual = DateEngine.getAdjacentCalendarDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the last day of the previous year', () => {
      const testDate = new Date(2020, 0, 1);
      const expected = new Date(2019, 11, 31);
      const actual = DateEngine.getAdjacentCalendarDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('getAdjacentBusinessDate()', () => {
  describe('find next business day', () => {
    it('should return the following Monday', () => {
      const testDate = new Date(2020, 8, 11); // Friday Sep 11 2020
      const expected = new Date(2020, 8, 14); // Monday Sep 14 2020
      const actual = DateEngine.getAdjacentBusinessDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the day after the holiday', () => {
      const testDate = new Date(2020, 10, 10); // Day before Veteran's Day
      const expected = new Date(2020, 10, 12); // Thursday Nov 12 2020
      const actual = DateEngine.getAdjacentBusinessDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous business day', () => {
    it('should return the previous Friday', () => {
      const testDate = new Date(2020, 8, 11); // Friday Sep 11 2020
      const expected = new Date(2020, 8, 10); // Thursday Sep 10 2020
      const actual = DateEngine.getAdjacentBusinessDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the day before the holiday', () => {
      const testDate = new Date(2020, 4, 26); // Day after Memorial Day
      const expected = new Date(2020, 4, 22); // Friday May 22 2020
      const actual = DateEngine.getAdjacentBusinessDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('getAdjacentWeekendDate()', () => {
  describe('find next weekend day', () => {
    it('should return the following Saturday', () => {
      const testDate = new Date(2020, 7, 18); // Tuesday Aug 18 2020
      const expected = new Date(2020, 7, 22); // Saturday Aug 22 2020
      const actual = DateEngine.getAdjacentWeekendDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the next day, Sunday', () => {
      const testDate = new Date(2020, 7, 22); // Saturday Aug 22 2020
      const expected = new Date(2020, 7, 23); // Sunday Aug 23 2020
      const actual = DateEngine.getAdjacentWeekendDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the Saturday, even though it is a holiday', () => {
      const testDate = new Date(2020, 6, 3); // Friday Jul 3 2020
      const expected = new Date(2020, 6, 4); // Saturday Jul 4 2020 - Independence Day
      const actual = DateEngine.getAdjacentWeekendDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous weekend day', () => {
    it('should return the previous Sunday', () => {
      const testDate = new Date(2020, 7, 25); // Tuesday Aug 25 2020
      const expected = new Date(2020, 7, 23); // Sunday Aug 23 2020
      const actual = DateEngine.getAdjacentWeekendDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the previous day, Saturday', () => {
      const testDate = new Date(2020, 7, 23); // Sunday Aug 23 2020
      const expected = new Date(2020, 7, 22); // Satruday Aug 22 2020
      const actual = DateEngine.getAdjacentWeekendDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the the Saturday, even though it is a holiday', () => {
      const testDate = new Date(2020, 6, 5); // Sunday Jul 5 2020
      const expected = new Date(2020, 6, 4); // Saturday Jul 4 2020
      const actual = DateEngine.getAdjacentWeekendDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('getAdjacentHolidayDate()', () => {
  describe('find next holiday', () => {
    it('should return a floating holiday from a non-holiday', () => {
      const testDate = new Date(2020, 10, 16);
      const expected = new Date(2020, 10, 26); // Thanksgiving
      const actual = DateEngine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a floating holiday', () => {
      const testDate = new Date(2020, 0, 20); // MLK Day
      const expected = new Date(2020, 1, 17); // President's Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 6, 4); // Independence Day
      const expected = new Date(2020, 8, 7); // Labor Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a non-holiday', () => {
      const testDate = new Date(2020, 11, 1);
      const expected = new Date(2020, 11, 25); // Christmas Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a floating holiday', () => {
      const testDate = new Date(2020, 10, 26); // Thanksgiving
      const expected = new Date(2020, 11, 25); // Christmas Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 11, 25); // Christmas Day
      const expected = new Date(2021, 0, 1); // New Year's Day (following year)
      const actual = DateEngine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous holiday', () => {
    it('should return a floating holiday from a non-holiday', () => {
      const testDate = new Date(2020, 10, 30);
      const expected = new Date(2020, 10, 26); // Thanksgiving
      const actual = DateEngine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a floating holiday', () => {
      const testDate = new Date(2020, 9, 12); // Columbus Day
      const expected = new Date(2020, 8, 7); // Labor Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 6, 4); // Independence Day
      const expected = new Date(2020, 4, 25); // Memorial Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a non-holiday', () => {
      const testDate = new Date(2020, 11, 28);
      const expected = new Date(2020, 11, 25); // Christmas Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a floating holiday', () => {
      const testDate = new Date(2020, 0, 20); // MLK Day
      const expected = new Date(2020, 0, 1); // New Year's Day
      const actual = DateEngine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 0, 1); // New Year's Day
      const expected = new Date(2019, 11, 25); // Christmas Day (previous year)
      const actual = DateEngine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});
//#endregion

//#region getDateType Helper Methods
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
  // Testing finding the last occurrence of a day of the week
  it('should return the date of the floating date pattern - counting from end of month', () => {
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
  // Testing finding the Nth occurrence of a day of the week
  it('should return the date of the floating date pattern - counting the Nth occurrence', () => {
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

describe('calculateHolidayDates()', () => {
  it('should return a list of all holidays in a calendar year in chronological order', () => {
    const year = 2020;

    const expected = [
      new Date(year, 0, 1), // New Year's Day (Jan 01)
      new Date(year, 0, 20), // MLK Day (Jan 20)
      new Date(year, 1, 17), // President's Day (Feb 17)
      new Date(year, 4, 25), // Memorial Day (May 25)
      new Date(year, 6, 4), // Independence Day (Jul 04)
      new Date(year, 8, 7), // Labor Day (Sep 07)
      new Date(year, 9, 12), // Columbus Day (Oct 12)
      new Date(year, 10, 11), // Veteran's Day (Nov 11)
      new Date(year, 10, 26), // Thanksgiving (Nov 26)
      new Date(year, 11, 25), // Christmas (Dec 25)
    ];

    const actual = DateEngine.calculateHolidayDates(year);
  });
});
//#endregion

//#region Faker Generated Tests
describe('getAdjacentCalendarDate()', () => {
  it('should return the next calendar date', () => {
    const year = new Date().getFullYear();
    const month = faker.random.number({ min: 0, max: 11 });
    const lastDayInMonth = lastDayOfMonth(new Date(year, month)).getDate();
    const day = faker.random.number({ min: 1, max: lastDayInMonth });

    const startDate = new Date(year, month, day);
    const expected = addDays(startDate, 1);
    const actual = DateEngine.getAdjacentCalendarDate(startDate, true);

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
    const actual = DateEngine.getAdjacentCalendarDate(startDate, false);

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
    while (DateEngine.getDateType(expected) != DateType.Business) {
      expected = addDays(expected, 1);
    }

    const actual = DateEngine.getAdjacentBusinessDate(startDate, true);

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
    while (DateEngine.getDateType(expected) != DateType.Business) {
      expected = addDays(expected, -1);
    }

    const actual = DateEngine.getAdjacentBusinessDate(startDate, false);

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

    const actual = DateEngine.getAdjacentWeekendDate(startDate, true);

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

    const actual = DateEngine.getAdjacentWeekendDate(startDate, false);

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
    while (DateEngine.getDateType(expected) != DateType.Holiday) {
      expected = addDays(expected, 1);
    }

    const actual = DateEngine.getAdjacentHolidayDate(startDate, true);

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
    while (DateEngine.getDateType(expected) != DateType.Holiday) {
      expected = addDays(expected, -1);
    }

    const actual = DateEngine.getAdjacentHolidayDate(startDate, false);

    expect(isValid(actual)).toBeTruthy();
    expect(actual).toStrictEqual(expected);
  });
});

//#endregion
