import { getDate } from '../../src/endpoints';
import { DateType } from '../../src/contracts';

describe('getDate()', () => {
  describe('return valid IDate objects', () => {
    it('should return valid IDate object', () => {
      const expected = {
        date: '8/20/2020',
        type: DateType.Business,
        nextDate: '8/21/2020',
        nextBusinessDate: '8/21/2020',
        nextWeekendDate: '8/22/2020',
        nextHolidayDate: '9/7/2020',
        previousDate: '8/19/2020',
        previousBusinessDate: '8/19/2020',
        previousWeekendDate: '8/16/2020',
        previousHolidayDate: '7/4/2020',
      };

      const actual = getDate('2020', '8', '20');

      expect(actual).toStrictEqual(expected);
    });

    it('should return valid IDate object', () => {
      const expected = {
        date: '1/1/2021',
        type: DateType.Holiday,
        nextDate: '1/2/2021',
        nextBusinessDate: '1/4/2021',
        nextWeekendDate: '1/2/2021',
        nextHolidayDate: '1/18/2021',
        previousDate: '12/31/2020',
        previousBusinessDate: '12/31/2020',
        previousWeekendDate: '12/27/2020',
        previousHolidayDate: '12/25/2020',
      };

      const actual = getDate('2021', '1', '1');

      expect(actual).toStrictEqual(expected);
    });

    it('should return valid IDate object', () => {
      const expected = {
        date: '2/29/2020',
        type: DateType.Weekend,
        nextDate: '3/1/2020',
        nextBusinessDate: '3/2/2020',
        nextWeekendDate: '3/1/2020',
        nextHolidayDate: '5/25/2020',
        previousDate: '2/28/2020',
        previousBusinessDate: '2/28/2020',
        previousWeekendDate: '2/23/2020',
        previousHolidayDate: '2/17/2020',
      };

      const actual = getDate('2020', '2', '29');

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('should throw error', () => {
    it('invalid year, month, day', () => {
      const error = new Error(
        'The following value(s) are invalid; please enter a number for: year, month, day.'
      );

      expect(() => {
        getDate('a', 'b', 'c');
      }).toThrow(error.message);
    });

    it('invalid year and day', () => {
      const error = new Error(
        'The following value(s) are invalid; please enter a number for: year, day.'
      );

      expect(() => {
        getDate('a', '10', 'c');
      }).toThrow(error.message);
    });

    it('invalid month only', () => {
      const error = new Error(
        'The following value(s) are invalid; please enter a number for: month.'
      );

      expect(() => {
        getDate('2020', 'b', '28');
      }).toThrow(error.message);
    });

    it('invalid year, month, day (negative)', () => {
      const error = new Error(
        'The following value(s) are invalid; please enter a number greater than 0 for: year, month, day.'
      );

      expect(() => {
        getDate('-1', '-5', '-10');
      }).toThrow(error.message);
    });

    it('invalid year, day (negative)', () => {
      const error = new Error(
        'The following value(s) are invalid; please enter a number greater than 0 for: year, day.'
      );

      expect(() => {
        getDate('-1', '5', '-10');
      }).toThrow(error.message);
    });

    it('invalid month only (negative)', () => {
      const error = new Error(
        'The following value(s) are invalid; please enter a number greater than 0 for: month.'
      );

      expect(() => {
        getDate('2020', '-5', '10');
      }).toThrow(error.message);
    });

    it('invalid month (>12)', () => {
      const error = new Error(
        'Month is invalid; please enter a number between 1 and 12.'
      );

      expect(() => {
        getDate('2020', '13', '1');
      }).toThrow(error.message);
    });

    it('invalid day (32)', () => {
      const error = new Error(
        'Day is invalid; please enter a number between 1 and 31.'
      );

      expect(() => {
        getDate('2020', '5', '32');
      }).toThrow(error.message);
    });

    it('invalid day (April 31)', () => {
      const error = new Error(
        'Day is invalid; please enter a number between 1 and 30.'
      );

      expect(() => {
        getDate('2020', '4', '31');
      }).toThrow(error.message);
    });

    it('invalid day (Feb 29 on non-leap year)', () => {
      const error = new Error(
        'Day is invalid; please enter a number between 1 and 28.'
      );

      expect(() => {
        getDate('2021', '2', '29');
      }).toThrow(error.message);
    });
  });
});
