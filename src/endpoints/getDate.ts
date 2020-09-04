import { IDate, DateType } from '../contracts';

export const getDate = (dateStr: string): IDate => {
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
