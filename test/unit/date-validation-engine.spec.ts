import {
  DateValidationEngine,
  IDateValidationEngine,
} from '../../src/services';

const engine: IDateValidationEngine = new DateValidationEngine();

describe('parseDateStringToNumber()', () => {
  describe('should return null', () => {
    it('valid year, month, day', () => {
      const year = '2020';
      const month = '7';
      const day = '1';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toBeNull();
    });
  });

  describe('should return string error message', () => {
    it('invalid year, month, day', () => {
      const year = 'a';
      const month = 'b';
      const day = 'c';
      const expected =
        'The following value(s) are invalid; please enter a number for: year, month, day.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });

    it('invalid year, month', () => {
      const year = 'a';
      const month = 'b';
      const day = '1';
      const expected =
        'The following value(s) are invalid; please enter a number for: year, month.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('invalid year, day', () => {
      const year = 'a';
      const month = '7';
      const day = 'c';
      const expected =
        'The following value(s) are invalid; please enter a number for: year, day.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('invalid month, day', () => {
      const year = '2020';
      const month = 'b';
      const day = 'c';
      const expected =
        'The following value(s) are invalid; please enter a number for: month, day.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('invalid year only', () => {
      const year = 'a';
      const month = '7';
      const day = '1';
      const expected =
        'The following value(s) are invalid; please enter a number for: year.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });

    it('invalid month only', () => {
      const year = '2020';
      const month = 'b';
      const day = '1';
      const expected =
        'The following value(s) are invalid; please enter a number for: month.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('invalid day only', () => {
      const year = '2020';
      const month = '7';
      const day = 'c';
      const expected =
        'The following value(s) are invalid; please enter a number for: day.';
      const actual = engine.parseDateStringToNumber(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('checkPositiveValues()', () => {
  describe('should return null', () => {
    it('valid year, month, and day', () => {
      const year = 2020;
      const month = 7;
      const day = 1;
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toBeNull();
    });
  });
  describe('should return string error message', () => {
    it('negative year, month, day', () => {
      const year = -2020;
      const month = -7;
      const day = -1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: year, month, day.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('negative year, month', () => {
      const year = -2020;
      const month = -7;
      const day = 1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: year, month.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('negative year, day', () => {
      const year = -2020;
      const month = 7;
      const day = -1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: year, day.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('negative month, day', () => {
      const year = 2020;
      const month = -7;
      const day = -1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: month, day.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('negative year only', () => {
      const year = -2020;
      const month = 7;
      const day = 1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: year.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('negative month only', () => {
      const year = 2020;
      const month = -7;
      const day = 1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: month.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
    it('negative day only', () => {
      const year = 2020;
      const month = 7;
      const day = -1;
      const expected =
        'The following value(s) are invalid; please enter a number greater than 0 for: day.';
      const actual = engine.checkPositiveValues(year, month, day);
      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('checkValidValues()', () => {
  describe('should return null', () => {
    it('valid month - check boundary', () => {
      const month = 1;
      const actual = engine.checkValidValues(2020, month, 1);
      expect(actual).toBeNull();
    });
    it('valid month - check boundary', () => {
      const month = 12;
      const actual = engine.checkValidValues(2020, month, 1);
      expect(actual).toBeNull();
    });
    it('valid month', () => {
      const month = 6;
      const actual = engine.checkValidValues(2020, month, 1);
      expect(actual).toBeNull();
    });

    it('valid day - check boundary', () => {
      const day = 1;
      const actual = engine.checkValidValues(2020, 1, day);
      expect(actual).toBeNull();
    });
    it('valid day - check Leap Day boundary', () => {
      const day = 29;
      const actual = engine.checkValidValues(2020, 2, day);
      expect(actual).toBeNull();
    });
    it('valid day - check 31st boundary', () => {
      const day = 31;
      const actual = engine.checkValidValues(2020, 3, day);
      expect(actual).toBeNull();
    });
    it('valid day - check 30th boundary', () => {
      const day = 30;
      const actual = engine.checkValidValues(2020, 4, day);
      expect(actual).toBeNull();
    });
    it('valid day', () => {
      const day = 15;
      const actual = engine.checkValidValues(2020, 6, day);
      expect(actual).toBeNull();
    });
  });
  describe('should return string error message', () => {
    it('invalid month (>12)', () => {
      const expected =
        'Month is invalid; please enter a number between 1 and 12.';
      const actual = engine.checkValidValues(2020, 13, 1);
      expect(actual).toStrictEqual(expected);
    });

    it('invalid day (32)', () => {
      const expected =
        'Day is invalid; please enter a number between 1 and 31.';
      const actual = engine.checkValidValues(2020, 5, 32);
      expect(actual).toStrictEqual(expected);
    });

    it('invalid day (April 31)', () => {
      const expected =
        'Day is invalid; please enter a number between 1 and 30.';
      const actual = engine.checkValidValues(2020, 4, 31);
      expect(actual).toStrictEqual(expected);
    });

    it('should return invalid day (Feb 29 on non-leap year)', () => {
      const expected =
        'Day is invalid; please enter a number between 1 and 28.';
      const actual = engine.checkValidValues(2021, 2, 29);
      expect(actual).toStrictEqual(expected);
    });
  });
});
