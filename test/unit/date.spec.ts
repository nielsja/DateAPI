import { getDate } from '../../src/endpoints';
import { DateType } from '../../src/contracts';

describe('getDate()', () => {
  it('should return stub value', () => {
    const expected = {
      date: 'string',
      type: DateType.Business,
      nextDate: 'string',
      nextBusinessDate: null,
      nextWeekendDate: null,
      nextHolidayDate: null,
      previousDate: 'string',
      previousBusinessDate: null,
      previousWeekendDate: null,
      previousHolidayDate: null,
    };

    const actual = getDate('foo');

    expect(actual).toStrictEqual(expected);
  });
});
