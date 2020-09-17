import { getRange } from '../../src/endpoints';
import { DateType } from '../../src/contracts';

describe('getRange()', () => {
  describe('return valid IDate objects', () => {
    it('should return a single valid IDate object', () => {
      const expected = [
        {
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
        },
      ];

      const actual = getRange('2020', '8', '20', '2020', '8', '20');

      expect(actual).toStrictEqual(expected);
    });

    it('should return a range of valid IDate objects', () => {
      const expected = [
        {
          date: '7/2/2020',
          type: DateType.Business,
          nextDate: '7/3/2020',
          nextBusinessDate: '7/3/2020',
          nextWeekendDate: '7/4/2020',
          nextHolidayDate: '7/4/2020',
          previousDate: '7/1/2020',
          previousBusinessDate: '7/1/2020',
          previousWeekendDate: '6/28/2020',
          previousHolidayDate: '5/25/2020',
        },
        {
          date: '7/3/2020',
          type: DateType.Business,
          nextDate: '7/4/2020',
          nextBusinessDate: '7/6/2020',
          nextWeekendDate: '7/4/2020',
          nextHolidayDate: '7/4/2020',
          previousDate: '7/2/2020',
          previousBusinessDate: '7/2/2020',
          previousWeekendDate: '6/28/2020',
          previousHolidayDate: '5/25/2020',
        },
        {
          date: '7/4/2020',
          type: DateType.Holiday,
          nextDate: '7/5/2020',
          nextBusinessDate: '7/6/2020',
          nextWeekendDate: '7/5/2020',
          nextHolidayDate: '9/7/2020',
          previousDate: '7/3/2020',
          previousBusinessDate: '7/3/2020',
          previousWeekendDate: '6/28/2020',
          previousHolidayDate: '5/25/2020',
        },
        {
          date: '7/5/2020',
          type: DateType.Weekend,
          nextDate: '7/6/2020',
          nextBusinessDate: '7/6/2020',
          nextWeekendDate: '7/11/2020',
          nextHolidayDate: '9/7/2020',
          previousDate: '7/4/2020',
          previousBusinessDate: '7/3/2020',
          previousWeekendDate: '7/4/2020',
          previousHolidayDate: '7/4/2020',
        },
        {
          date: '7/6/2020',
          type: DateType.Business,
          nextDate: '7/7/2020',
          nextBusinessDate: '7/7/2020',
          nextWeekendDate: '7/11/2020',
          nextHolidayDate: '9/7/2020',
          previousDate: '7/5/2020',
          previousBusinessDate: '7/3/2020',
          previousWeekendDate: '7/5/2020',
          previousHolidayDate: '7/4/2020',
        },
      ];

      const actual = getRange('2020', '7', '2', '2020', '7', '6');

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('should throw error', () => {
    it('start date - values cannot be parsed to numbers', () => {
      const error = new Error(
        'Start Date Error: The following value(s) are invalid; please enter a number for: year, month, day.'
      );

      expect(() => {
        getRange('a', 'b', 'c', '2020', '7', '1');
      }).toThrow(error.message);
    });

    it('end date - values cannot be parsed to numbers', () => {
      const error = new Error(
        'End Date Error: The following value(s) are invalid; please enter a number for: year, month, day.'
      );

      expect(() => {
        getRange('2020', '7', '1', 'a', 'b', 'c');
      }).toThrow(error.message);
    });

    it('start date - values are negative', () => {
      const error = new Error(
        'Start Date Error: The following value(s) are invalid; please enter a number greater than 0 for: year, month, day.'
      );

      expect(() => {
        getRange('-1', '-5', '-10', '2020', '7', '1');
      }).toThrow(error.message);
    });

    it('end date - values are negative', () => {
      const error = new Error(
        'End Date Error: The following value(s) are invalid; please enter a number greater than 0 for: year, month, day.'
      );

      expect(() => {
        getRange('2020', '7', '1', '-1', '-5', '-10');
      }).toThrow(error.message);
    });

    it('start date - invalid month (>12)', () => {
      const error = new Error(
        'Start Date Error: Month is invalid; please enter a number between 1 and 12.'
      );

      expect(() => {
        getRange('2020', '13', '1', '2020', '7', '1');
      }).toThrow(error.message);
    });

    it('end date - invalid month (>12)', () => {
      const error = new Error(
        'End Date Error: Month is invalid; please enter a number between 1 and 12.'
      );

      expect(() => {
        getRange('2020', '7', '1', '2020', '13', '1');
      }).toThrow(error.message);
    });

    it('start date - invalid day (32)', () => {
      const error = new Error(
        'Start Date Error: Day is invalid; please enter a number between 1 and 31.'
      );

      expect(() => {
        getRange('2020', '12', '32', '2020', '7', '1');
      }).toThrow(error.message);
    });

    it('end date - invalid day (32)', () => {
      const error = new Error(
        'End Date Error: Day is invalid; please enter a number between 1 and 31.'
      );

      expect(() => {
        getRange('2020', '7', '1', '2020', '12', '32');
      }).toThrow(error.message);
    });

    it('end date is greater than the start date', () => {
      const error = new Error('End date is before Start date.');

      expect(() => {
        getRange('2020', '7', '1', '2020', '6', '1');
      }).toThrow(error.message);
    });
  });
});
