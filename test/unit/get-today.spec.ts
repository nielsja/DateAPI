import { getToday } from '../../src/endpoints';
import { DateType } from '../../src/contracts';

describe('getToday()', () => {
  it('should return stub value', () => {
    const expected = {
      date: 'string',
      type: DateType.Business,
      nextDate: 'string',
      nextBusinessDate: 'string',
      nextWeekendDate: 'string',
      nextHolidayDate: 'string',
      previousDate: 'string',
      previousBusinessDate: 'string',
      previousWeekendDate: 'string',
      previousHolidayDate: 'string',
    };

    const actual = getToday();

    expect(actual).toStrictEqual(expected);
  });
});
