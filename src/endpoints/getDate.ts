import { IDate, DateType } from '../contracts';

export const getDate = (dateStr: string): IDate => {
  // TODO - add isValid here to check if the date is valid first

  return {
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
};
