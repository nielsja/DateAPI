import { IDate, DateType } from '../contracts';

export const getRange = (startDateStr: string, endDateStr: string): IDate => {
  return {
    date: 'string',
    type: DateType.Holiday,
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
