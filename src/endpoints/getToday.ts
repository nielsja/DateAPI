import { IDate, DateType } from '../contracts';
import { parseISO } from 'date-fns';
import { DateEngine } from '../services/DateEngine';

export const getToday = (): IDate => {
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
