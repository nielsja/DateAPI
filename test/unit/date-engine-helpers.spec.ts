import { DateEngine } from '../../src/services';

const engine = new DateEngine();

//#region Get Adjacent Date Methods
describe('getAdjacentCalendarDate()', () => {
  describe('find next calendar date', () => {
    it('should return the next calendar date', () => {
      const testDate = new Date(2020, 7, 21); // Friday Aug 21 2020
      const expected = new Date(2020, 7, 22); // Saturday Aug 22 2020
      const actual = engine.getAdjacentCalendarDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the first day of the following year', () => {
      const testDate = new Date(2020, 11, 31);
      const expected = new Date(2021, 0, 1);
      const actual = engine.getAdjacentCalendarDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous calendar date', () => {
    it('should return the previous calendar date', () => {
      const testDate = new Date(2020, 7, 21); // Friday Aug 21 2020
      const expected = new Date(2020, 7, 20); // Thursday Aug 20 2020
      const actual = engine.getAdjacentCalendarDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the last day of the previous year', () => {
      const testDate = new Date(2020, 0, 1);
      const expected = new Date(2019, 11, 31);
      const actual = engine.getAdjacentCalendarDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('getAdjacentBusinessDate()', () => {
  describe('find next business day', () => {
    it('should return the following Monday', () => {
      const testDate = new Date(2020, 8, 11); // Friday Sep 11 2020
      const expected = new Date(2020, 8, 14); // Monday Sep 14 2020
      const actual = engine.getAdjacentBusinessDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the day after the holiday', () => {
      const testDate = new Date(2020, 10, 10); // Day before Veteran's Day
      const expected = new Date(2020, 10, 12); // Thursday Nov 12 2020
      const actual = engine.getAdjacentBusinessDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous business day', () => {
    it('should return the previous Friday', () => {
      const testDate = new Date(2020, 8, 11); // Friday Sep 11 2020
      const expected = new Date(2020, 8, 10); // Thursday Sep 10 2020
      const actual = engine.getAdjacentBusinessDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the day before the holiday', () => {
      const testDate = new Date(2020, 4, 26); // Day after Memorial Day
      const expected = new Date(2020, 4, 22); // Friday May 22 2020
      const actual = engine.getAdjacentBusinessDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('getAdjacentWeekendDate()', () => {
  describe('find next weekend day', () => {
    it('should return the following Saturday', () => {
      const testDate = new Date(2020, 7, 18); // Tuesday Aug 18 2020
      const expected = new Date(2020, 7, 22); // Saturday Aug 22 2020
      const actual = engine.getAdjacentWeekendDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the next day, Sunday', () => {
      const testDate = new Date(2020, 7, 22); // Saturday Aug 22 2020
      const expected = new Date(2020, 7, 23); // Sunday Aug 23 2020
      const actual = engine.getAdjacentWeekendDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the Saturday, even though it is a holiday', () => {
      const testDate = new Date(2020, 6, 3); // Friday Jul 3 2020
      const expected = new Date(2020, 6, 4); // Saturday Jul 4 2020 - Independence Day
      const actual = engine.getAdjacentWeekendDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous weekend day', () => {
    it('should return the previous Sunday', () => {
      const testDate = new Date(2020, 7, 25); // Tuesday Aug 25 2020
      const expected = new Date(2020, 7, 23); // Sunday Aug 23 2020
      const actual = engine.getAdjacentWeekendDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the previous day, Saturday', () => {
      const testDate = new Date(2020, 7, 23); // Sunday Aug 23 2020
      const expected = new Date(2020, 7, 22); // Satruday Aug 22 2020
      const actual = engine.getAdjacentWeekendDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the the Saturday, even though it is a holiday', () => {
      const testDate = new Date(2020, 6, 5); // Sunday Jul 5 2020
      const expected = new Date(2020, 6, 4); // Saturday Jul 4 2020
      const actual = engine.getAdjacentWeekendDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('getAdjacentHolidayDate()', () => {
  describe('find next holiday', () => {
    it('should return a floating holiday from a non-holiday', () => {
      const testDate = new Date(2020, 10, 16);
      const expected = new Date(2020, 10, 26); // Thanksgiving
      const actual = engine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a floating holiday', () => {
      const testDate = new Date(2020, 0, 20); // MLK Day
      const expected = new Date(2020, 1, 17); // President's Day
      const actual = engine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 6, 4); // Independence Day
      const expected = new Date(2020, 8, 7); // Labor Day
      const actual = engine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a non-holiday', () => {
      const testDate = new Date(2020, 11, 1);
      const expected = new Date(2020, 11, 25); // Christmas Day
      const actual = engine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a floating holiday', () => {
      const testDate = new Date(2020, 10, 26); // Thanksgiving
      const expected = new Date(2020, 11, 25); // Christmas Day
      const actual = engine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 11, 25); // Christmas Day
      const expected = new Date(2021, 0, 1); // New Year's Day (following year)
      const actual = engine.getAdjacentHolidayDate(testDate, true);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('find previous holiday', () => {
    it('should return a floating holiday from a non-holiday', () => {
      const testDate = new Date(2020, 10, 30);
      const expected = new Date(2020, 10, 26); // Thanksgiving
      const actual = engine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a floating holiday', () => {
      const testDate = new Date(2020, 9, 12); // Columbus Day
      const expected = new Date(2020, 8, 7); // Labor Day
      const actual = engine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a floating holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 6, 4); // Independence Day
      const expected = new Date(2020, 4, 25); // Memorial Day
      const actual = engine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a non-holiday', () => {
      const testDate = new Date(2020, 11, 28);
      const expected = new Date(2020, 11, 25); // Christmas Day
      const actual = engine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a floating holiday', () => {
      const testDate = new Date(2020, 0, 20); // MLK Day
      const expected = new Date(2020, 0, 1); // New Year's Day
      const actual = engine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });

    it('should return a fixed holiday from a fixed holiday', () => {
      const testDate = new Date(2020, 0, 1); // New Year's Day
      const expected = new Date(2019, 11, 25); // Christmas Day (previous year)
      const actual = engine.getAdjacentHolidayDate(testDate, false);
      expect(actual).toStrictEqual(expected);
    });
  });
});
//#endregion

//#region Holiday Helper Methods
describe('checkIfFixedHoliday()', () => {
  it('should return true', () => {
    const testDate = new Date(2020, 11, 25); // Christmas Day
    const expected = true;
    const actual = engine.checkIfFixedHoliday(testDate);
    expect(actual).toStrictEqual(expected);
  });

  it('should return false', () => {
    const testDate = new Date(2020, 11, 24); // Christmas Eve
    const expected = false;
    const actual = engine.checkIfFixedHoliday(testDate);
    expect(actual).toStrictEqual(expected);
  });
});

describe('checkIfFloatingHoliday()', () => {
  it('should return true', () => {
    const testDate = new Date(2020, 8, 7); // Labor Day 2020
    const expected = true;
    const actual = engine.checkIfFloatingHoliday(testDate);
    expect(actual).toStrictEqual(expected);
  });

  it('should return false', () => {
    const testDate = new Date(2020, 8, 8); // Not Labor Day 2020
    const expected = false;
    const actual = engine.checkIfFloatingHoliday(testDate);
    expect(actual).toStrictEqual(expected);
  });
});

describe('calculateFloatingDate()', () => {
  it('should return the last occurence of a day of the week', () => {
    const year = 2020;
    const month = 1; // February
    const dayOfWeek = 5; // Friday
    const week = -1; // Last occurrence

    const expected = new Date(2020, 1, 28); // Last Saturday of February 2020 = 2/28

    const actual = engine.calculateFloatingDate(year, month, week, dayOfWeek);

    expect(actual).toStrictEqual(expected);
  });

  it('should return the Nth occurrence of a day of the week', () => {
    const year = 2020;
    const month = 7; // August
    const dayOfWeek = 4; // Thursday
    const week = 3; // 3rd occurrence

    const expected = new Date(2020, 7, 20); // 3rd Thursday of August 2020 = 8/20

    const actual = engine.calculateFloatingDate(year, month, week, dayOfWeek);

    expect(actual).toStrictEqual(expected);
  });

  it('should not return a date', () => {
    const year = 2020;
    const month = 10; // November
    const dayOfWeek = 4; // Thursday
    const week = 6; // 6th Thursday

    const expected = undefined; // 6th Thursday of November does not exist

    const actual = engine.calculateFloatingDate(year, month, week, dayOfWeek);

    expect(actual).toStrictEqual(expected);
  });
});

describe('calculateHolidayDates()', () => {
  it('should return a list of all 2020 holidays in chronological order', () => {
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

    const actual = engine.calculateHolidayDates(year);

    expect(actual).toStrictEqual(expected);
  });
});
//#endregion
